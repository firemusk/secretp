import { NextResponse } from 'next/server';
import { JobModel } from '@/models/Job';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    
    // Get all jobs without slugs
    const jobs = await JobModel.find({});
    let updated = 0;

    for (const job of jobs) {
      if (!job.slug) {
        const slug = `${job.title}-at-${job.companyName}-${job._id.toString().slice(-6)}`
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();

        await JobModel.findByIdAndUpdate(job._id, { slug: slug });
        updated++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updated} jobs with slugs`
    });
  } catch (error) {
    console.error('Error in migration:', error);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}
