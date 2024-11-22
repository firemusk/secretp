'use client';

import FairPayCalculator from '@/app/components/FairPayCalculator';
import { Theme } from '@radix-ui/themes';

export default function FairPayPage() {
  return (
    <Theme>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Fair Pay Calculator</h1>
        <FairPayCalculator />
      </div>
    </Theme>
  );
}