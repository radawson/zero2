import Link from "next/link";
import { getOutbreakPosts } from "@/src/lib/outbreak";

export default async function OutbreakPage() {
  const posts = await getOutbreakPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-3xl p-8 text-white">
        <h1 className="mb-2 text-3xl font-bold text-shadow">Outbreak Blog</h1>
        <p className="mb-8 text-white/80">
          An ongoing story of survival and preparation.
        </p>
        {posts.length === 0 ? (
          <p className="text-white/70">No posts yet. Check back soon.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.id} className="border-b border-z-gray/50 pb-6 last:border-0">
                <Link
                  href={`/outbreak/${post.slug}`}
                  className="block transition-colors hover:text-z-green"
                >
                  <h2 className="text-xl font-bold text-shadow">{post.title}</h2>
                  {post.excerpt && (
                    <p className="mt-2 text-white/80">{post.excerpt}</p>
                  )}
                  <time
                    dateTime={post.createdAt.toISOString()}
                    className="mt-2 block text-sm text-z-green/90"
                  >
                    {post.createdAt.toLocaleDateString()}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
