import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blogUtils';

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} className="border-b pb-4">
            <Link href={`/blog/${id}`} className="text-xl font-semibold hover:underline">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}