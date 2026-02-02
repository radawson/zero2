import Link from "next/link";
import { getOutbreakPosts } from "@/src/lib/outbreak";

export default async function OutbreakPage() {
  const posts = await getOutbreakPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-z-black">Outbreak Blog</h1>
      <p className="mb-8 text-z-gray">
        An ongoing story of survival and preparation.
      </p>
      {posts.length === 0 ? (
        <p className="text-z-gray">No posts yet. Check back soon.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-z-gray/30 pb-6">
              <Link
                href={`/outbreak/${post.slug}`}
                className="block hover:text-z-purple"
              >
                <h2 className="text-xl font-bold text-z-black">{post.title}</h2>
                {post.excerpt && (
                  <p className="mt-2 text-z-gray">{post.excerpt}</p>
                )}
                <time
                  dateTime={post.createdAt.toISOString()}
                  className="mt-2 block text-sm text-z-gray/80"
                >
                  {post.createdAt.toLocaleDateString()}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
