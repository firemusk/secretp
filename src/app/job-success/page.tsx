'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { updateJobStatusAfterPayment } from '@/app/actions/jobActions';

export default function JobSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
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
          updateJobStatusAfterPayment(data.jobId, data.plan);
        }
      })
      .catch(error => console.error('Error:', error));
    }

    // Set a timeout to redirect after 5 seconds (5000 milliseconds)
    const redirectTimeout = setTimeout(() => {
      router.push('/'); // Redirect to the home page
    }, 5000);

    // Clean up the timeout if the component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [searchParams, router]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f8ff'
    }}>
      <div style={{
        border: '2px solid #28a745',
        backgroundColor: '#d4edda',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#28a745',
          marginBottom: '20px',
          fontSize: '2.5rem'
        }}>Payment Successful!</h1>
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.6',
          color: '#333'
        }}>
          Your job posting has been successfully published. Thank you for choosing our platform!
        </p>
        <p style={{
          fontSize: '1rem',
          marginTop: '20px',
          color: '#666'
        }}>
          You will be redirected to the home page in 5 seconds...
        </p>
      </div>
    </div>
  );
}
