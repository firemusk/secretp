import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStripe } from "@fortawesome/free-brands-svg-icons";

const SecurePaymentBadge: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mt-2">
        <span className="font-medium">Secure Payments by</span>
        {/* @ts-ignore*/}
        <FontAwesomeIcon icon={faStripe} className="text-indigo-500 w-12 h-12" />
      </div>
  );
};
export default SecurePaymentBadge;
