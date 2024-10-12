'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import JobForm from '@/app/components/JobForm';
import { saveJobAction } from "@/app/actions/jobActions";
import { Theme, Button } from '@radix-ui/themes';

export default function NewListingFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const savedJob = await saveJobAction(formData);
      router.push(`/jobs/${savedJob._id}`);
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Theme>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Job Listing</h1>
        <JobForm />
      </div>
    </Theme>
  );
}
