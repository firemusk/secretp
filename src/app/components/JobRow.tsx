'use client';
import TimeAgo from "@/app/components/TimeAgo";
import {Job, JobModel} from "@/models/Job";
import {faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';

export default function JobRow({jobDoc}:{jobDoc:Job}) {
  const isPro = jobDoc.plan === "pro";
  
  return (
    <div className={`rounded-lg shadow-sm relative`}>
      <div className={`bg-white p-4 rounded-lg relative`}>
        {isPro && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
            <FontAwesomeIcon icon={faStar} className="mr-1" /> featured
          </div>
        )}
        {/*}<div className="absolute cursor-pointer top-4 right-4">
          <FontAwesomeIcon className="size-4 text-gray-300 hover:text-red-500 transition-colors" icon={faHeart} />
        </div>*/}
        <div className="flex grow gap-4">
          <div className="content-center w-12 basis-12 shrink-0">
            <Image
              className="size-12"
              src={jobDoc?.jobIcon}
              alt="Icon for job listing company"
              width={48}
              height={48}
            />
          </div>
          <div className="grow sm:flex">
            <div className="grow">
              <div>
                <Link href={`/jobs/${jobDoc.orgId}`} className="hover:underline text-gray-600 text-sm font-medium">{jobDoc.companyName || '?'}</Link>
              </div>
              <div className="font-bold text-lg mb-1">
                <Link className="hover:underline text-gray-800" href={'/show/'+jobDoc._id}>{jobDoc.title}</Link>
              </div>
              <div className="text-gray-500 text-sm capitalize flex flex-wrap gap-2">
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{jobDoc.seniority}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{jobDoc.city || 'Brussels'}, {jobDoc.country || 'Belgium'}</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded-full">{jobDoc.type}-time</span>
                {jobDoc.isAdmin && (
                  <>
                    <Link href={'/jobs/edit/'+jobDoc._id} className="text-blue-500 hover:underline">Edit</Link>
                    <button
                      type="button"
                      className="text-red-500 hover:underline"
                      onClick={async () => {
                        await axios.delete('/api/jobs?id='+jobDoc._id);
                        window.location.reload();
                      }}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            {jobDoc.createdAt && (
              <div className="content-end text-gray-500 text-sm mt-2 sm:mt-0">
                <TimeAgo createdAt={jobDoc.createdAt} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
