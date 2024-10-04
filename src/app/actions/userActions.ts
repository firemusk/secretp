'use server'
import { UserModel, User } from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { getUser } from "@workos-inc/authkit-nextjs";

// Types
type WorkOSUser = {
  user: {
    id: string;
    email: string;
    // Add other properties as needed
  }
};

type CreateUserResult = {
  success: boolean;
  message: string;
  user?: User;
};

// Helper Functions
async function connectAndGetWorkOSUser(): Promise<WorkOSUser> {
  await dbConnect();
  const workosUser = await getUser();
  if (!workosUser) {
    throw new Error('WorkOS user not found');
  }
  return workosUser;
}

// Main Functions
export async function createUser(formData: FormData): Promise<CreateUserResult> {
  try {
    const { user: workosUser } = await connectAndGetWorkOSUser();

    const name = formData.get('name');
    if (typeof name !== 'string' || name.length === 0) {
      throw new Error('Invalid name');
    }

    const isJobPosterString = formData.get('isJobPoster');
    if (typeof isJobPosterString !== 'string') {
      throw new Error('Invalid value for isJobPoster');
    }
    const isJobPoster = isJobPosterString === 'true';

    const user = new UserModel({
      name,
      isJobPoster,
      workosId: workosUser.id,
      email: workosUser.email
    });

    await user.save();
    console.log('User created:', user);

    return { success: true, message: `User ${name} created successfully!`, user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to create user.' };
  }
}

export async function getCustomUser(): Promise<User | null> {
  try {
    const { user: workosUser } = await connectAndGetWorkOSUser();
    
    const user = await UserModel.findOne({ workosId: workosUser.id });
    if (!user) {
      console.log('User not found for WorkOS ID:', workosUser.id);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting custom user:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}


