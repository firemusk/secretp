import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import { getCustomUser } from "@/app/actions/userActions";

export default async function Header() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  let isJobPoster = false;
  let plan = 'free';
  if (user) {
    try {
      const customUser = await getCustomUser();
      isJobPoster = customUser?.isJobPoster || false;
      plan = customUser?.plan || 'free';
    } catch (error) {
      console.error("Error fetching custom user:", error);
      // Handle error as needed, e.g., set a default value or show an error message
    }
  }

  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href={'/'} className="font-bold text-xl">Job Board</Link>
        <nav className="flex gap-2">
          {!user && (
            <Link className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4" href={signInUrl}>
              Login
            </Link>
          )}
          {user && (
            <>
              <form action={async () => {
                'use server';
                await signOut();
              }}>
                <button type="submit" className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4">
                  Logout
                </button>
              </form>
{plan === 'free' ? (
  <div className="relative group">
    <button
      disabled
      className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-200 text-white cursor-not-allowed opacity-60"
    >
      Post a job
    </button>
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
      Upgrade your plan to post jobs
    </div>
  </div>
) : (
  <Link
    className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
    href="/new-listing"
  >
    Post a job
  </Link>
)}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
