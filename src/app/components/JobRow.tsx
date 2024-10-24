'use client';
import TimeAgo from "@/app/components/TimeAgo";
import {Job, JobModel} from "@/models/Job";
import {faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';

export default function JobRow({jobDoc}:{jobDoc:Job}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isPro = jobDoc.plan === "pro";
  const isIcon = jobDoc.jobIcon !== "";

  return (
    <div 
      className={`rounded-lg shadow-sm relative`}
    >
      <div className={`bg-white p-4 rounded-lg relative  ${isExpanded && 'shadow-md'}`}
      >
        {isPro && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
            <FontAwesomeIcon icon={faStar} className="mr-1" /> featured
          </div>
        )}
        <div className="flex grow gap-4 hover:bg-gray-50 hover:cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="grow sm:flex pl-2">
            <div className="grow">
              <div>
                <div className="text-gray-600 text-sm font-medium">
                  {jobDoc.companyName || '?'}
                </div>
              </div>
              <div className="font-bold text-lg mb-1">
                <h2 className="text-gray-800">{jobDoc.title}</h2>
              </div>
              <div className="text-gray-500 text-sm capitalize flex flex-wrap gap-2">
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{jobDoc.seniority}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{jobDoc.city || 'Brussels'}, {jobDoc.country || 'Belgium'}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{jobDoc.type}-time</span>
              </div>
            </div>
            {jobDoc.createdAt && (
              <div className="content-end text-gray-500 text-xs mt-2 sm:mt-0">
                <TimeAgo createdAt={jobDoc.createdAt} />
              </div>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 border-t pt-4 space-y-6 transition-all duration-200">
            {/* Job Description Section */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Job Description</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{jobDoc.description}</p>
            </div>

            {/* Job Details Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">Job Details</h3>
              <div className="space-y-2">
                {jobDoc.salary && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary:</span>
                    <span className="font-medium">${jobDoc.salary.toLocaleString()}/year</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{jobDoc.city}, {jobDoc.state}, {jobDoc.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{jobDoc.type}-time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seniority:</span>
                  <span className="font-medium capitalize">{jobDoc.seniority}</span>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">Contact Information</h3>
              <div className="space-y-2">
                {jobDoc.contactName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact Person:</span>
                    <span className="font-medium">{jobDoc.contactName}</span>
                  </div>
                )}
                {jobDoc.contactEmail && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{jobDoc.contactEmail}</span>
                  </div>
                )}
                {jobDoc.contactPhone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{jobDoc.contactPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
