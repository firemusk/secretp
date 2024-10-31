import mongoose, { model, models, Schema } from 'mongoose';
import dbConnect from '@/lib/dbConnect';

export type Job = {
  _id: string;
  title: string;
  description: string;
  companyName: string;
  remote: string;
  type: string;
  salary: number;
  country: string;
  state: string;
  city: string;
  countryId: string;
  stateId: string;
  cityId: string;
  jobIcon: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: string;
  updatedAt: string;
  seniority: string;
  plan?: string;
  userWorkosId?: string;
};

const JobSchema = new Schema({
  title: { type: String },
  description: { type: String },
  companyName: { type: String },
  type: { type: String },
  salary: { type: Number },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  countryId: { type: String },
  stateId: { type: String },
  cityId: { type: String },
  jobIcon: { type: String },
  contactName: { type: String },
  contactPhone: { type: String },
  contactEmail: { type: String },
  seniority: { type: String },
  userWorkosId: { type: String, required: false },
  plan: {
    type: String, 
    enum: ['pending', 'basic', 'premium', 'unlimited'],
    required: false,
    default: 'pending' // this will change after stripe confirmation
  }
}, {
  timestamps: true,
});

export const JobModel = models?.Job || model('Job', JobSchema);

// If you need to perform any additional processing on job documents, you can create a new function here

export async function fetchJobs(limit: number = 10) {
  try {
    await dbConnect();
    
    // First, fetch pro jobs
    const proJobs = await JobModel.find(
      { plan: 'pro' },
      {},
      { sort: '-createdAt', limit }
    );
    
    // Then, fetch basic jobs (excluding both pro and pending)
    const remainingLimit = limit - proJobs.length;
    const otherJobs = await JobModel.find(
      { 
        plan: { 
          $nin: ['pro', 'pending'] // not in ['pro', 'pending']
        }
      },
      {},
      { sort: '-createdAt', limit: remainingLimit }
    );

    // Combine the results
    const allJobs = [...proJobs, ...otherJobs];
    return JSON.parse(JSON.stringify(allJobs));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
