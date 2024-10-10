'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { updateJobStatusAfterPayment } from '@/app/actions/jobActions';

export default function JobSuccessPage() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // Verify the session with Stripe and get the metadata
      fetch('/api/verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.jobId && data.plan) {
          // Update the job status
          updateJobStatusAfterPayment(data.jobId, data.plan);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your job posting has been successfully published.</p>
    </div>
  );
}
