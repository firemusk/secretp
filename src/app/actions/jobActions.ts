'use server';
import { JobModel, Job } from '@/models/Job';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
//import { getCustomUser } from '@/app/actions/userActions';
import { getUser } from "@workos-inc/authkit-nextjs";
import dbConnect from '@/lib/dbConnect';

const JobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  userWorkosId: z.string().optional(), 
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
    console.log("we have entered the save job action function you get me.");
    
    // Convert FormData to an object
    const jobData = Object.fromEntries(formData);
    //console.log(jobData);

    let workosUserId = null;
    try {
      // Attempt to get the current user, but don't throw an error if not found
      const workosUser = await getUser();
      workosUserId = workosUser.user.id;
    } catch (error) {
      console.log('No authenticated user found, proceeding as guest');
    }

    console.log(workosUserId);

    let jobDataWithOptionalWorkosId = jobData;
    if (workosUserId) { //make sure that this value is not null or empty
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
    const workosUser = await getUser();

    if (!workosUser || !workosUser.user.id) {
      throw new Error('User not found or missing workosId');
    }

    const userWorkosId = workosUser.user.id;

    // Find all jobs where companyName matches the user's name
    const jobs = await JobModel.find({ userWorkosId: userWorkosId });
    console.log('Retrieved jobs:', jobs);
    return jobs.map(job => job.toObject());  // Convert to plain JavaScript objects
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    throw new Error('Failed to retrieve jobs');
  }
}

// search jobs with the search input field on the home page 
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

