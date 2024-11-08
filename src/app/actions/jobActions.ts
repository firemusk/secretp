'use server';
import { JobModel, Job } from '@/models/Job';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { withAuth } from "@workos-inc/authkit-nextjs";
import dbConnect from '@/lib/dbConnect';

const JobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  seniority: z.enum(["intern", "entry", "mid", "senior"]),
  companyName: z.string().min(1, "Company name is required"),
  type: z.enum(["project", "part", "full"]),
  contactEmail: z.string().email(),
  userWorkosId: z.string().optional(), 
  salary: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  countryId: z.string().optional(),
  stateId: z.string().optional(),
  cityId: z.string().optional(),
  jobIcon: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
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
    console.log("we have entered the save job action function you get me.");
    
    // Convert FormData to an object
    const jobData = Object.fromEntries(formData);

    let workosUserId = null;
    try {
      const workosUser = await withAuth();
      // Add proper null checks
      if (workosUser?.user?.id) {
        workosUserId = workosUser.user.id;
      } else {
        console.log('User or user ID is null');
      }
    } catch (error) {
      console.log('No authenticated user found, proceeding as guest');
    }

    //console.log(workosUserId);

    let jobDataWithOptionalWorkosId = jobData;
    if (workosUserId) {
      jobDataWithOptionalWorkosId = {
        ...jobData,
        userWorkosId: workosUserId
      };
    }

    // Validate the data
    const validatedData = JobSchema.parse(jobDataWithOptionalWorkosId);

    let job;
    if (validatedData.id) {
      // For updates, check ownership only if there's a user
      if (workosUserId) {
        const existingJob = await JobModel.findOne({ _id: validatedData.id, userWorkosId: workosUserId });
        if (!existingJob) {
          throw new Error('Job not found or you do not have permission to edit it');
        }
      }
      job = await JobModel.findByIdAndUpdate(validatedData.id, validatedData, { new: true });
    } else {
      job = await JobModel.create(validatedData);
    }

    if (!job) {
      throw new Error('Failed to save job');
    }

    revalidatePath('/jobs');
    return job.toObject();
  } catch (error) {
    console.error('Error saving job:', error);
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message).join(", ");
      throw new Error(`Validation failed: ${errorMessages}`);
    }
    throw new Error('Failed to save job');
  }
}

export async function getMyJobs(): Promise<Job[]> {
  try {
    const workosUser = await withAuth();
    if (!workosUser?.user?.id) {
      throw new Error('User not found or missing workosId');
    }

    const userWorkosId = workosUser.user.id;
    const userWorkosEmail = workosUser.user.email;

    // Define admin emails in a constant for better maintainability
    const ADMIN_EMAILS = ['mouise12345@gmail.com', 'chaollapark@gmail.com'];

    // Use conditional assignment
    const jobs = ADMIN_EMAILS.includes(userWorkosEmail)
      ? await JobModel.find({})
      : await JobModel.find({ userWorkosId: userWorkosId });

    return jobs.map(job => job.toObject());
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    throw new Error('Failed to retrieve jobs');
  }
}

export async function searchJobs(searchPhrase: string, limit: number = 10): Promise<Job[]> {
  try {
    await dbConnect();
    
    const searchRegex = new RegExp(searchPhrase, 'i');
    
    const jobs = await JobModel.find(
      {
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { companyName: searchRegex },
        ]
      },
      {},
      { sort: '-createdAt', limit }
    );
    
    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.error('Error searching jobs:', error);
    return [];
  }
}
