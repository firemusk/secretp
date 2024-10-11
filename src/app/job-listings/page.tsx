'use client'
import React, { useEffect, useState } from 'react';
import { getMyJobs } from '@/app/actions/jobActions';
import { Job } from '@/models/Job';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBuilding, faChartLine, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

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

  async function deleteJob(id: string) {
    try {
      await axios.delete(`/api/jobs?id=${id}`);
      setJobs(jobs.filter(job => job._id !== id));
      setJobToDelete(null);
    } catch (err) {
      console.error('Failed to delete job:', err);
      setError('Failed to delete job');
    }
  }

  function ConfirmationDialog() {
    if (!jobToDelete) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Job Listing</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this job listing? This action cannot be undone.
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={() => deleteJob(jobToDelete._id)}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete
              </button>
              <button
                onClick={() => setJobToDelete(null)}
                className="mt-3 px-4 py-2 bg-white text-gray-800 text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <p>You have not posted any job listings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                  <button 
                    onClick={() => setJobToDelete(job)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                  </button>
                </div>
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
            </div>
          ))}
        </div>
      )}
      <ConfirmationDialog />
    </div>
  );
}
