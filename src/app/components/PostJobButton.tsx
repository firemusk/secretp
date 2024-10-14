"use client"
import Link from "next/link";
import * as Tooltip from '@radix-ui/react-tooltip';

export default function PostJobButton({ isLoggedIn }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div>
            <Link
              className={`rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white transition-colors duration-200 ${
                isLoggedIn ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
              }`}
              href={isLoggedIn ? "/new-listing/form" : "#"}
              onClick={(e) => !isLoggedIn && e.preventDefault()}
            >
              Post a job
            </Link>
          </div>
        </Tooltip.Trigger>
        {!isLoggedIn && (
          <Tooltip.Portal>
            <Tooltip.Content className="bg-gray-800 text-white p-2 rounded-md text-sm">
              Please log in to post a job
              <Tooltip.Arrow className="fill-gray-800" />
            </Tooltip.Content>
          </Tooltip.Portal>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
