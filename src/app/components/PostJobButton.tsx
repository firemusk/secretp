"use client"
import Link from "next/link";

export default function PostJobButton() {
  return (
    <Link
      className="rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-indigo-600 text-white transition-colors duration-200 hover:bg-indigo-700"
      href="/new-listing/form"
    >
      Post a job
    </Link>
  );
}
