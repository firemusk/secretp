'use client';

import JobForm from '@/app/components/JobForm';
import { Theme } from '@radix-ui/themes';
import ValueProposition from '@/app/components/jobform/ValueProposition';
import FAQ from '@/app/components/jobform/FAQ';
import SecurePaymentBadge from '@/app/components/jobform/SecurePaymentBadge';

export default function NewListingFormPage() {

  return (
    <Theme>
      <div className="lg:w-4/6 mx-auto px-4 py-6">
        <div className='flex md:flex-row lg:gap-8'>
          <JobForm />
          <div className="hidden md:block md:w-1/2">
          <ValueProposition/>
          <FAQ/>
          <SecurePaymentBadge/>
          </div>
        </div>
      </div>
    </Theme>
  );
}
