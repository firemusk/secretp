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
      question: "Differences eujobs vs Eurobrussels?",
      answer: "EUJobs offers instant payment options and job postings at just 100 euros, compared to the 2000 euros charged by other platforms. Whether you're seeking to post on EUJobs, Eurobrussels, or attract candidates for jobs Euractiv or Euractive Jobs, our cost-effective pricing ensures your job opportunities reach the right audience at a fraction of the cost."
    },
    {
      question: "Why use eujobs instead of euractiv jobs Brussels?",
      answer: "EUJobs is the fastest-growing Brussels public affairs job site, offering affordable job postings at just 100 euros instead of the 1000 euros charged by others. For employers targeting Brussels employment or professionals seeking European jobs in Brussels, EUJobs stands out as an effective alternative to Euractiv Jobs and Euroactive Jobs platforms."
    },
    {
      question: "How long are job listings active?",
      answer: "Job listings on Euractiv Jobs remain active for 30 days from the date of posting. If you're looking to attract top talent in Brussels or across the EU job market, you can renew or extend your listing to keep it visible. Euractiv Jobs ensures your postings reach professionals searching for European jobs in Brussels, Eurobrussels roles, and more."
    },
    {
      question: "Do you offer candidate screening?",
      answer: "Yes! Euractiv Jobs provides optional candidate screening services to help you find the most qualified professionals for your open positions. Whether you're hiring for Euractive Jobs, Eurobrussels, or other Brussels employment opportunities, we streamline the process to connect you with top-tier candidates in the EU job market."
    },
    {
      question: "Are international candidates welcome?",
      answer: "Absolutely! Euractiv Jobs caters to the diverse, international nature of Brussels and the EU job market. We welcome candidates from all EU member states and beyond, ensuring your listings are visible to those seeking European jobs in Brussels and beyond. Our platform is a key hub for jobs Euractiv, Euroactive Jobs, and more."
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
