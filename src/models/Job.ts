import mongoose, { model, models, Schema } from 'mongoose';
import dbConnect from '@/lib/dbConnect';

export type Job = {
  _id: string;
  title: string;
  slug: string;  
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

function generateSlug(title: string | null | undefined, companyName: string | null | undefined, id: string): string {
  // Convert to lowercase and remove special characters
  const processString = (str: string | null | undefined) => 
    (str || '')  // Use empty string if null/undefined
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const titleSlug = processString(title) || 'untitled';  // Default value if empty
  const companySlug = processString(companyName) || 'unknown-company';  // Default value if empty
  const shortId = id.slice(-6);

  return `${titleSlug}-at-${companySlug}-${shortId}`;
}

const JobSchema = new Schema({
  title: { type: String },
  slug: { 
    type: String,
    unique: true,
    sparse: true  // Allows null/undefined values
  },
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
    enum: ['pending', 'basic', 'premium', 'enterprise', 'unlimited'],
    required: false,
    default: 'pending'
  }
}, {
  timestamps: true
});

// Pre-save middleware to generate slug
JobSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isModified('companyName') || !this.slug) {
    this.slug = generateSlug(this.title, this.companyName, this._id.toString());
  }
  next();
});

// Add an index for slug
JobSchema.index({ slug: 1 });

export const JobModel = models?.Job || model('Job', JobSchema);

// Updated fetchJobs function
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
          $nin: ['pro', 'pending']
        }
      },
      {},
      { sort: '-createdAt', limit: remainingLimit }
    );
    
    const allJobs = [...proJobs, ...otherJobs];
    return JSON.parse(JSON.stringify(allJobs));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Add a function to find job by slug
export async function findJobBySlug(slug: string) {
  try {
    await dbConnect();
    const job = await JobModel.findOne({ slug });
    return job ? JSON.parse(JSON.stringify(job)) : null;
  } catch (error) {
    console.error('Error finding job by slug:', error);
    return null;
  }
}
