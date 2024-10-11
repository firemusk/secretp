import dbConnect from '@/lib/dbConnect';
import Hero from "@/app/components/Hero";
import Jobs from "@/app/components/Jobs";
import { fetchJobs } from "@/models/Job";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Home() {
  await dbConnect();
  const initialJobs = await fetchJobs(10); // Fetch initial 10 jobs

  return (
    <>
      <Hero />
      <Jobs header="latest jobs" initialJobs={initialJobs} />
    </>
  );
}
