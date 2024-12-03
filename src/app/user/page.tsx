'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUser, isProfileComplete } from "@/app/actions/userActions";

export default function CreateUserPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isJobPoster, setIsJobPoster] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function checkProfileStatus() {
      try {
        const profileComplete = await isProfileComplete();
        if (profileComplete) {
          console.log('Profile is already completed');
          router.push('/');
        } else {
          //setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking profile status:', error);
        setMessage('An error occurred while checking your profile status.');
        //setIsLoading(false);
      }
    }

    checkProfileStatus();
  }, [router]);


  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    formData.set('isJobPoster', isJobPoster ? 'true' : 'false');
    try {
      const result = await createUser(formData);
      console.log(Object.fromEntries(formData));
      setMessage(result.message);
      
      if (result.success) {
        const redirectPath = isJobPoster ? '/pricing' : '/';
        setRedirectMessage(`Account created successfully! Redirecting to ${isJobPoster ? 'pricing page' : 'home page'}...`);
        
        setTimeout(() => {
          router.push(redirectPath);
        }, 3000); // 3 seconds delay
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('An error occurred while creating the user.');
      setIsSubmitting(false);
    }
  }

  function handleNext() {
    if (isJobPoster !== null) {
      setStep(2);
    } else {
      setMessage('Please select an option before proceeding.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tell us more about you
          </h2>
        </div>
        {step === 1 ? (
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="poster"
                  name="isJobPoster"
                  type="radio"
                  checked={isJobPoster === true}
                  onChange={() => setIsJobPoster(true)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="poster" className="ml-3 block text-sm font-medium text-gray-700">
                  I want to post jobs
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="seeker"
                  name="isJobPoster"
                  type="radio"
                  checked={isJobPoster === false}
                  onChange={() => setIsJobPoster(false)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="seeker" className="ml-3 block text-sm font-medium text-gray-700">
                  I am looking to apply to jobs
                </label>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleNext}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={(e) => {
            e.preventDefault();
            if (!isSubmitting) {
              handleSubmit(new FormData(e.currentTarget));
            }
          }}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  {isJobPoster ? 'Company Name' : 'Name'}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={isJobPoster ? 'Enter company name' : 'Enter your name'}
                />
              </div>
            </div>
            <input type="hidden" name="isJobPoster" value={isJobPoster ? 'true' : 'false'} />
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isSubmitting ? 'Creating Account...' : 'Create User'}
              </button>
            </div>
          </form>
        )}
        {message && (
          <div className="mt-4 text-center text-sm text-gray-600">
            {message}
          </div>
        )}
        {redirectMessage && (
          <div className="mt-4 text-center text-sm text-green-600 font-semibold">
            {redirectMessage}
          </div>
        )}
      </div>
    </div>
  );
}
