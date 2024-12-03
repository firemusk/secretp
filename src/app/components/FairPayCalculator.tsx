'use client';

import { useState, useEffect } from 'react';
import { RadioGroup, Button, Theme, TextField } from "@radix-ui/themes";
import * as Accordion from '@radix-ui/react-accordion';

interface SalaryData {
  min: number;
  max: number;
  average: number;
}

type Category = 'consultancy' | 'trade_association' | 'in_house' | 'ngo';
type Seniority = 'junior' | 'mid' | 'senior';

const SALARY_RANGES = {
  consultancy: {
    junior: { min: 2500, max: 3500, average: 3000 },
    mid: { min: 3500, max: 5500, average: 4500 },
    senior: { min: 6000, max: 10000, average: 8000 }
  },
  trade_association: {
    junior: { min: 2000, max: 3000, average: 2500 },
    mid: { min: 3000, max: 4500, average: 3750 },
    senior: { min: 4500, max: 6000, average: 5250 }
  },
  in_house: {
    junior: { min: 2800, max: 4500, average: 3650 },
    mid: { min: 4500, max: 7500, average: 6000 },
    senior: { min: 7500, max: 12000, average: 9750 }
  },
  ngo: {
    junior: { min: 2000, max: 3000, average: 2500 },
    mid: { min: 3000, max: 4500, average: 3750 },
    senior: { min: 4500, max: 6000, average: 5250 }
  }
};

const FairPayCalculator = () => {
  const [category, setCategory] = useState<Category>('consultancy');
  const [seniority, setSeniority] = useState<Seniority>('junior');
  const [currentSalary, setCurrentSalary] = useState<string>('');
  const [result, setResult] = useState<SalaryData | null>(null);

  const calculateFairSalary = () => {
    const salaryRange = SALARY_RANGES[category][seniority];
    setResult(salaryRange);
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const message = encodeURIComponent("Are you getting paid fairly? Check on the Fair Pay Calculator.");
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(linkedInShareUrl, '_blank');
  };

  return (
    <Theme>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6">
          EUjobs Fair Pay Calculator 
          <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">BETA</span>
        </h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <RadioGroup.Root value={category} onValueChange={(value: Category) => setCategory(value)}>
              <div className="space-y-2">
                <div className="flex items-center">
                  <RadioGroup.Item value="consultancy" id="consultancy" />
                  <label className="ml-2" htmlFor="consultancy">Consultancy</label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item value="trade_association" id="trade_association" />
                  <label className="ml-2" htmlFor="trade_association">Trade Association</label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item value="in_house" id="in_house" />
                  <label className="ml-2" htmlFor="in_house">In-House</label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item value="ngo" id="ngo" />
                  <label className="ml-2" htmlFor="ngo">NGO</label>
                </div>
              </div>
            </RadioGroup.Root>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seniority Level</label>
            <RadioGroup.Root value={seniority} onValueChange={(value: Seniority) => setSeniority(value)}>
              <div className="space-y-2">
                <div className="flex items-center">
                  <RadioGroup.Item value="junior" id="junior" />
                  <label className="ml-2" htmlFor="junior">Junior (0-2 years)</label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item value="mid" id="mid" />
                  <label className="ml-2" htmlFor="mid">Mid-Level (3-5 years)</label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item value="senior" id="senior" />
                  <label className="ml-2" htmlFor="senior">Senior (5+ years)</label>
                </div>
              </div>
            </RadioGroup.Root>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Current Monthly Salary Before Taxes(€)</label>
            <input
              type="number"
              placeholder="e.g. 3500"
              className="text-left"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
            />
          </div>

          <Button onClick={calculateFairSalary} className="mt-4 mr-4">
            Calculate Fair Salary
          </Button>

          <Button onClick={shareOnLinkedIn} className="mt-4">
            Share on LinkedIn
          </Button>

          {result && (
            <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Results</h2>
              <div className="space-y-2">
                <p>Expected salary range for your profile:</p>
                <p>€{result.min.toLocaleString()} - €{result.max.toLocaleString()}/month</p>
                <p>Average: €{result.average.toLocaleString()}/month</p>
                {currentSalary && (
                  <p className={`font-semibold ${Number(currentSalary) < result.min ? 'text-red-500' : 'text-green-500'}`}>
                    Your salary is {Number(currentSalary) < result.min ? 'below' : 'within'} the expected range
                  </p>
                )}
              </div>
            </div>
          )}

          <Accordion.Root type="single" collapsible>
            <Accordion.Item value="resources">
              <Accordion.Trigger className="w-full">
                <div className="flex justify-between items-center p-4 bg-gray-100 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold">Related Resources</h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content>
                <div className="space-y-3 p-4 bg-gray-100 border-x border-b border-gray-200 rounded-b-lg">
                  <a href="https://www.doberpartners.com/corporate-eu-public-affairs-compensation-benefits-report/" className="block p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Salaries for In House Lobbyists</span>
                    <p className="text-sm text-gray-600 mt-1">Beneifts, salaries and ranges in the Eurobrussels context</p>
                  </a>
                  <a href="https://www.doberpartners.com/european-trade-association-compensation-benefits-2023-24-report/" className="block p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-medium">Salaries for Trade Associations</span>
                    <p className="text-sm text-gray-600 mt-1">Beneifts, salaries and ranges in the Eurobrussels context</p>
                  </a>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      </div>
    </Theme>
  );
};

export default FairPayCalculator;
