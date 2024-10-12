"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PricingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async (planName: string, price: number) => {
    setIsLoading(true);
    try {
      const endpoint = planName === 'Basic Plan' ? '/api/checkout-basic' : '/api/checkout-pro';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planName, price }),
      });
      const data = await response.json();
      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const PricingCard = ({ title, price, features, buttonText }: { title: string; price: string; features: string[]; buttonText: string }) => (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-2xl font-bold mb-4">{price}</p>
      <ul className="list-disc list-inside mb-4">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button
        onClick={() => handleCheckout(title, parseFloat(price.replace('€', '')))}
        disabled={isLoading}
        className="transition-colors hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {isLoading ? 'Processing...' : buttonText}
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard
          title="Basic Plan"
          price="€100.00"
          features={[
            "Your job visible on the homepage for 7 days",
            "Your vacancy in the newsletter for 1 day",
            "Your vacancy in a LinkedIn post alongside other vacancies",
            "Instant post after submission",
            "Unlimited revisions"
          ]}
          buttonText="Choose Plan"
        />
        <PricingCard
          title="Pro Plan"
          price="€200.00"
          features={[
            "Your vacancy on the homepage for 30 days",
            "Your vacancy in the newsletter for 30 days",
            "Your vacancy in a dedicated LinkedIn Post",
            "Instant post after submission",
            "Unlimited revisions"
          ]}
          buttonText="Choose Plan"
        />
        <PricingCard
          title="Enterprise Plan"
          price="Contact Us"
          features={[
            "All Pro features",
            "Custom solutions",
            "Dedicated support"
          ]}
          buttonText="Contact Sales"
        />
      </div>
    </div>
  );
};

export default PricingPage;
