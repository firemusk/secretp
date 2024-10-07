import React from 'react';
import JobRow from "@/app/components/JobRow";
import type { Job } from "@/models/Job";

interface JobsProps {
  header: string;
  jobs: Job[];
}

export default function Jobs({ header, jobs }: JobsProps) {
  return (
    <div className="bg-slate-200 py-6 rounded-3xl">
      <div className="container">
        <h2 className="font-bold mb-4">{header || 'Recent jobs'}</h2>
        <div className="flex flex-col gap-4">
          {jobs.length === 0 ? (
            <div>No jobs found</div>
          ) : (
            jobs.map(job => (
              <JobRow key={job._id} jobDoc={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
