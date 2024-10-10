'use client';

import { saveJobAction } from "@/app/actions/jobActions";
import ImageUpload from "@/app/components/ImageUpload";
import type { Job } from "@/models/Job";
import { faEnvelope, faPhone, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useState } from "react";
import "react-country-state-city/dist/react-country-state-city.css";
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');

interface JobFormProps {
  jobDoc?: Job;
}

export default function JobForm({ jobDoc }: JobFormProps) {

  const [countryId, setCountryId] = useState(jobDoc?.countryId ? parseInt(jobDoc.countryId) : 0);
  const [stateId, setStateId] = useState(jobDoc?.stateId ? parseInt(jobDoc.stateId) : 0);
  const [cityId, setCityId] = useState(jobDoc?.cityId ? parseInt(jobDoc.cityId) : 0);
  const [countryName, setCountryName] = useState(jobDoc?.country || '');
  const [stateName, setStateName] = useState(jobDoc?.state || '');
  const [cityName, setCityName] = useState(jobDoc?.city || '');
  const [seniority, setSeniority] = useState(jobDoc?.seniority || 'entry');
  const [plan, setPlan] = useState(jobDoc?.plan || 'basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSaveJob(data: FormData) {
    setIsSubmitting(true);
    try {
      data.set('country', countryName);
      data.set('state', stateName);
      data.set('city', cityName);
      data.set('countryId', countryId.toString());
      data.set('stateId', stateId.toString());
      data.set('cityId', cityId.toString());
      data.set('seniority', seniority);
      data.set('plan', plan);
      const savedJob = await saveJobAction(data);

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: savedJob._id,
          plan: plan,
        }),
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error(`Failed to create checkout session: ${responseData.error || 'Unknown error'}`);
      }

      if (!responseData.sessionId) {
        throw new Error('No session ID returned from the server');
      }

      const result = await stripe.redirectToCheckout({
        sessionId: responseData.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error during job save or checkout:', error);
      // Here you might want to show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Theme>
      <form
        action={handleSaveJob}
        className="container mt-6 flex flex-col gap-4"
      >
        {jobDoc && (
          <input type="hidden" name="id" value={jobDoc._id} />
        )}
        <TextField.Root name="title" placeholder="Job title" defaultValue={jobDoc?.title || ''} />
        <TextField.Root name="companyName" placeholder="Company name" defaultValue={jobDoc?.companyName || ''} />
        <div className="grid sm:grid-cols-3 gap-6 *:grow">
          <div>
            Full time?
            <RadioGroup.Root defaultValue={jobDoc?.type || 'full'} name="type">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary
            <TextField.Root name="salary" defaultValue={jobDoc?.salary?.toString() || ''}>
              <TextField.Slot>
                $
              </TextField.Slot>
              <TextField.Slot>
                k/year
              </TextField.Slot>
            </TextField.Root>
          </div>
        </div>
        <div>
          Seniority
          <RadioGroup.Root defaultValue={seniority} name="seniority" onValueChange={setSeniority}>
            <RadioGroup.Item value="intern">Intern</RadioGroup.Item>
            <RadioGroup.Item value="entry">Entry</RadioGroup.Item>
            <RadioGroup.Item value="mid">Mid</RadioGroup.Item>
            <RadioGroup.Item value="senior">Senior</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
        <div>
          Location
          <div className="flex flex-col sm:flex-row gap-4 *:grow">
            <CountrySelect
              defaultValue={countryId ? { id: countryId, name: countryName } : undefined}
              onChange={(e: any) => {
                setCountryId(e.id);
                setCountryName(e.name);
              }}
              placeHolder="Select Country"
            />
            <StateSelect
              defaultValue={stateId ? { id: stateId, name: stateName } : undefined}
              countryid={countryId}
              onChange={(e: any) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />
            <CitySelect
              defaultValue={cityId ? { id: cityId, name: cityName } : undefined}
              countryid={countryId}
              stateid={stateId}
              onChange={(e: any) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>
        </div>
        <div className="sm:flex">
          <div className="w-1/3">
            <h3>Job icon</h3>
            <ImageUpload name="jobIcon" icon={faStar} defaultValue={jobDoc?.jobIcon || ''} />
          </div>
          <div className="grow">
            <h3>Contact person</h3>
            <div className="flex gap-2">
              <TextField.Root
                placeholder="John Doe"
                name="contactName"
                defaultValue={jobDoc?.contactName || ''}>
                <TextField.Slot>
                  <FontAwesomeIcon icon={faUser} />
                </TextField.Slot>
              </TextField.Root>
              <TextField.Root
                placeholder="Phone"
                type="tel"
                name="contactPhone"
                defaultValue={jobDoc?.contactPhone || ''}>
                <TextField.Slot>
                  <FontAwesomeIcon icon={faPhone} />
                </TextField.Slot>
              </TextField.Root>
              <TextField.Root
                placeholder="Email"
                type="email"
                name="contactEmail"
                defaultValue={jobDoc?.contactEmail || ''}>
                <TextField.Slot>
                  <FontAwesomeIcon icon={faEnvelope} />
                </TextField.Slot>
              </TextField.Root>
            </div>
          </div>
        </div>
        <TextArea
          defaultValue={jobDoc?.description || ''}
          placeholder="Job description"
          resize="vertical"
          name="description"
        />
        <div>
          Select a vacancy type
          <RadioGroup.Root defaultValue={plan} name="plan" onValueChange={setPlan}>
            <RadioGroup.Item value="basic">Basic ($10)</RadioGroup.Item>
            <RadioGroup.Item value="pro">Pro ($20)</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
        <div className="flex justify-center">
          <Button size="3">
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
