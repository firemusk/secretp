import { NextResponse } from 'next/server';
import { JobModel } from '@/models/Job';
import dbConnect from '@/lib/dbConnect';
import { getUser } from "@workos-inc/authkit-nextjs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const workosUser = await getUser();
    if (!workosUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const job = await JobModel.findOne({
      _id: params.id,
      userWorkosId: workosUser.user.id
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
