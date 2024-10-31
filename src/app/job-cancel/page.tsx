'use client';

import {  useState } from 'react';
import { Theme } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function JobCancelPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Your job posting payment was cancelled.');

  return (
    <Theme>
      <div className="container mx-auto max-w-xl py-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-4">
              <FontAwesomeIcon 
                icon={faTriangleExclamation} 
                className="h-12 w-12 text-yellow-500"
              />
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Payment Cancelled
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-6">
              You can try again or return to the job listings.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button 
              variant="soft" 
              size="3" 
              onClick={() => router.back()}
            >
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" size="3">
                View Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Theme>
  );
}
