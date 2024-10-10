'use client'
import React, { useEffect, useState } from 'react';
import { getMyJobs } from '@/app/actions/jobActions';
import { Job } from '@/models/Job';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBuilding, faLayerGroup, faChartLine } from "@fortawesome/free-solid-svg-icons";

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const fetchedJobs = await getMyJobs();
        setJobs(fetchedJobs);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Job Listings</h1>
      {jobs.length === 0 ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">No jobs found</p>
          <p>You haven't posted any job listings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faBuilding} className="mr-2 h-4 w-4" />
                  <p>{job.companyName}</p>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2 h-4 w-4" />
                  <p>{job.type}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon icon={faChartLine} className="mr-2 h-4 w-4" />
                  <p>{job.seniority}</p>
                </div>
              </div>
              {/*}
              <div className="bg-gray-100 px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Edit Listing
                </button>
              </div>
              */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
