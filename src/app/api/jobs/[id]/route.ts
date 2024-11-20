import { NextRequest, NextResponse } from 'next/server';
import { JobModel } from '@/models/Job';
import dbConnect from '@/lib/dbConnect';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const job = await JobModel.findById(params.id);
    console.log("this is the job", job);
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}
