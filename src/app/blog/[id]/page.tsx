import { getPostData, getSortedPostsData } from '@/lib/blogUtils';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
      <div className="text-gray-500 mb-6">{postData.date}</div>
      <div className="!prose max-w-none" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}
