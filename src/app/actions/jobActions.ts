'use server';
import { JobModel, Job } from '@/models/Job';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getCustomUser } from '@/app/actions/userActions';
import dbConnect from '@/lib/dbConnect';

const JobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  userWorkosId: z.string(), //maybe add min ...
  companyName: z.string().min(1, "Company name is required"),
  type: z.enum(["project", "part", "full"]),
  salary: z.string().optional(),
  seniority: z.enum(["intern", "entry", "mid", "senior"]),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  countryId: z.string().optional(),
  stateId: z.string().optional(),
  cityId: z.string().optional(),
  jobIcon: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional(),
  description: z.string().optional(),
});

export async function updateJobStatusAfterPayment(jobId: string, plan: string): Promise<Job> {
  try {
    await dbConnect();
    
    const job = await JobModel.findByIdAndUpdate(jobId, { plan: plan }, { new: true });
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    revalidatePath('/jobs');
    return job.toObject();
  } catch (error) {
    console.error('Error updating job status:', error);
    throw new Error('Failed to update job status');
  }
}

export async function saveJobAction(formData: FormData): Promise<Job> {
  try {
    await dbConnect();
    
    // Get the current user
    const user = await getCustomUser();
    if (!user || !user.workosId) {
      throw new Error('User not found or missing workosId');
    }
    // Convert FormData to an object
    const jobData = Object.fromEntries(formData);
    console.log(jobData);
    console.log(user.workosId);
    
    // Add the user's workosId to the job data
    const jobDataWithWorkosId = {
      ...jobData,
      userWorkosId: user.workosId
    };
    // Validate the data
    const validatedData = JobSchema.parse(jobDataWithWorkosId);
    let job;
    if (validatedData.id) {
      // For updates, ensure the user owns this job
      const existingJob = await JobModel.findOne({ _id: validatedData.id, userWorkosId: user.workosId });
      if (!existingJob) {
        throw new Error('Job not found or you do not have permission to edit it');
      }
      job = await JobModel.findByIdAndUpdate(validatedData.id, validatedData, { new: true });
    } else {
      job = await JobModel.create(validatedData);
    }
    if (!job) {
      throw new Error('Failed to save job');
    }
    revalidatePath('/jobs');
    return job.toObject(); // Convert to a plain JavaScript object
  } catch (error) {
    console.error('Error saving job:', error);
    if (error instanceof z.ZodError) {
      // If it's a validation error, we can provide more specific feedback
      const errorMessages = error.errors.map(err => err.message).join(", ");
      throw new Error(`Validation failed: ${errorMessages}`);
    }
    throw new Error('Failed to save job');
  }
}

export async function getMyJobs(): Promise<Job[]> {
  try {
    await dbConnect();
    const user = await getCustomUser();
    if (!user || !user.workosId) {
      throw new Error('User not found or missing workosId');
    }
    const userWorkosId = user.workosId;
    // Find all jobs where companyName matches the user's name
    const jobs = await JobModel.find({ userWorkosId: userWorkosId });
    console.log('Retrieved jobs:', jobs);
    return jobs.map(job => job.toObject());  // Convert to plain JavaScript objects
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    throw new Error('Failed to retrieve jobs');
  }
}
