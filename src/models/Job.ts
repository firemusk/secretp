import mongoose, { model, models, Schema } from 'mongoose';

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
}, {
  timestamps: true,
});

export const JobModel = models?.Job || model('Job', JobSchema);

// If you need to perform any additional processing on job documents, you can create a new function here

// Example of a function to fetch jobs (if needed)
export async function fetchJobs(limit: number = 10) {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    const jobs = await JobModel.find({}, {}, { sort: '-createdAt', limit });
    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
