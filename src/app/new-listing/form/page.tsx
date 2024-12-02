'use client';

import JobForm from '@/app/components/JobForm';
import { Theme } from '@radix-ui/themes';
import ValueProposition from '@/app/components/ValueProposition';
import FAQ from '@/app/components/FAQ';

export default function NewListingFormPage() {

  return (
    <Theme>
      <div className="lg:w-4/6 mx-auto px-4 py-6">
        <div className='flex md:flex-row lg:gap-8'>
          <JobForm />
          <div className="w-full md:w-1/2">
          <ValueProposition/>
          <FAQ/>
          </div>
        </div>
      </div>
    </Theme>
  );
}
