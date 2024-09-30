import React from 'react';
import Head from 'next/head';

const PricingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Pricing - Your App Name</title>
        <meta name="description" content="Pricing plans for Your App Name" />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Plan</h2>
          <p className="text-2xl font-bold mb-4">$9.99/month</p>
          <ul className="list-disc list-inside mb-4">
            <li>Post up to 5 job listings per month</li>
            <li>Basic job listing appearance</li>
          </ul>
          <button className="transition-colors hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded">
            Choose Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Pro Plan</h2>
          <p className="text-2xl font-bold mb-4">$19.99/month</p>
          <ul className="list-disc list-inside mb-4">
            <li>Unlimited job postings</li>
            <li>Featuredstings with priority placement</li>
          </ul>
          <button className="transition-colors hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded">
            Choose Plan
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Enterprise Plan</h2>
          <p className="text-2xl font-bold mb-4">Contact Us</p>
          <ul className="list-disc list-inside mb-4">
            <li>All Pro features</li>
            <li>Custom solutions</li>
            <li>Dedicated support</li>
          </ul>
          <button className="transition-colors hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
