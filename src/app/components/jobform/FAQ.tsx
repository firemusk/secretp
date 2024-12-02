import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// Define the type for an FAQ item
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How much does it cost to post a job on EUjobs.co?",
      answer: "We offer competitive pricing for job listings in Brussels and the EU. Our standard job posting starts at €99 per month, with discounts available for multiple listings or longer-term packages."
    },
    {
      question: "What types of jobs do you cover?",
      answer: "EUjobs.co specializes in professional jobs across various sectors in Brussels and the European Union, including roles in EU institutions, international organizations, tech, finance, and more."
    },
    {
      question: "How long are job listings active?",
      answer: "Job listings remain active for 30 days from the date of posting. You can renew or extend your listing to keep it visible to potential candidates."
    },
    {
      question: "Do you offer candidate screening?",
      answer: "Yes! We provide optional candidate screening services to help you find the most qualified professionals for your open positions in the EU job market."
    },
    {
      question: "Are international candidates welcome?",
      answer: "Absolutely! We cater to the diverse, international nature of Brussels and EU job market, welcoming candidates from all EU member states and beyond."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-gray-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-2">
            <button 
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
            >
              <span>{faq.question}</span>
              <FontAwesomeIcon 
                icon={activeIndex === index ? faChevronUp : faChevronDown} 
                className="text-gray-500"
              />
            </button>
            
            {activeIndex === index && (
              <div className="mt-2 text-gray-700 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
