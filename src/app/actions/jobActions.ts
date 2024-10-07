'use server';

import { JobModel, Job } from '@/models/Job';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const JobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
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

export async function saveJobAction(formData: FormData): Promise<Job> {
  const jobData = Object.fromEntries(formData);
  
  try {
    // Validate the data
    const validatedData = JobSchema.parse(jobData);

    let job;
    if (validatedData.id) {
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
