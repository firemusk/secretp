import mongoose from "mongoose";
import Hero from "@/app/components/Hero";
import Jobs from "@/app/components/Jobs";
import { addOrgAndUserData, JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";

// Database connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.MONGO_URI as string, {
    serverSelectionTimeoutMS: 5000, // Increase this value if necessary
    socketTimeoutMS: 45000, // Increase this value if necessary
  });
};

export default async function Home() {
  await connectDB();  // Ensure connection is established
  const { user } = await getUser();
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { sort: '-createdAt' }),
    user,
  );
  return (
    <>
      <Hero />
      <Jobs header={''} jobs={latestJobs} />
    </>
  );
}
