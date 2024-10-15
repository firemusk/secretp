import { handleAuth } from "@workos-inc/authkit-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { isProfileComplete } from '@/app/actions/userActions';

export async function GET(request: NextRequest) {
  const response = await handleAuth()(request);
  
  // Check if the user is authenticated
  if (response.status === 302) {
    // User is authenticated, now check if profile is complete
    const profileComplete = await isProfileComplete();
    
    if (profileComplete) {
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      return NextResponse.redirect(new URL('/user', request.url));
    }
  }
  
  // If not authenticated or any other case, return the original response
  return response;
}
