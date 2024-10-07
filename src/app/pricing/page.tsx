"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const PricingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async (planName: string, price: number) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
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
        onClick={() => handleCheckout(title, parseFloat(price.replace('$', '')))}
        disabled={isLoading}
        className="transition-colors hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {isLoading ? 'Processing...' : buttonText}
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Pricing - Your App Name</title>
        <meta name="description" content="Pricing plans for Your App Name" />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard
          title="Basic Plan"
          price="$9.99/month"
          features={[
            "Post up to 5 job listings per month",
            "Basic job listing appearance"
          ]}
          buttonText="Choose Plan"
        />
        <PricingCard
          title="Pro Plan"
          price="$19.99/month"
          features={[
            "Unlimited job postings",
            "Featured listings with priority placement"
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
