import Link from "next/link";
import { getOutbreakPosts, getOutbreakChannels } from "@/src/lib/outbreak";

type SearchParams = { page?: string; channel?: string };

export default async function OutbreakPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const channelSlug = params.channel || null;

  const [result, channels] = await Promise.all([
    getOutbreakPosts({ page, channelSlug }),
    getOutbreakChannels(),
  ]);

  const { posts, totalPages, total, page: currentPage } = result;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-3xl p-8 text-white">
        <h1 className="mb-2 text-3xl font-bold text-shadow">Outbreak Blog</h1>
        <p className="mb-6 text-white/80">
          An ongoing story of survival and preparation.
        </p>

        {channels.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <Link
              href="/outbreak"
              className={`rounded px-3 py-1 text-sm transition-colors ${
                !channelSlug
                  ? "bg-z-green text-z-black"
                  : "bg-z-gray/50 text-white hover:bg-z-gray/70"
              }`}
            >
              All
            </Link>
            {channels.map((ch) => (
              <Link
                key={ch.id}
                href={channelSlug === ch.slug ? "/outbreak" : `/outbreak?channel=${ch.slug}`}
                className={`rounded px-3 py-1 text-sm transition-colors ${
                  channelSlug === ch.slug
                    ? "bg-z-green text-z-black"
                    : "bg-z-gray/50 text-white hover:bg-z-gray/70"
                }`}
              >
                {ch.name}
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-white/70">No posts yet. Check back soon.</p>
        ) : (
          <>
            <ul className="space-y-6">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="border-b border-z-gray/50 pb-6 last:border-0"
                >
                  <Link
                    href={`/outbreak/${post.slug}`}
                    className="block transition-colors hover:text-z-green"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                      {post.featuredImage && (
                        <div className="h-36 w-full shrink-0 overflow-hidden rounded sm:h-28 sm:w-44">
                          <img
                            src={post.featuredImage}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold text-shadow">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="mt-2 text-white/80 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-z-green/90">
                          <time dateTime={post.createdAt.toISOString()}>
                            {post.createdAt.toLocaleDateString()}
                          </time>
                          {post.author && (
                            <span>
                              {post.author.name ?? post.author.email}
                            </span>
                          )}
                          {post.channel && (
                            <span className="text-white/70">
                              {post.channel.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav
                className="mt-8 flex flex-wrap items-center justify-center gap-2"
                aria-label="Pagination"
              >
                {currentPage > 1 && (
                  <Link
                    href={
                      channelSlug
                        ? `/outbreak?page=${currentPage - 1}&channel=${channelSlug}`
                        : `/outbreak?page=${currentPage - 1}`
                    }
                    className="rounded border border-z-gray/50 px-3 py-1 text-sm text-white hover:bg-z-gray/50"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-2 text-sm text-white/80">
                  Page {currentPage} of {totalPages} ({total} posts)
                </span>
                {currentPage < totalPages && (
                  <Link
                    href={
                      channelSlug
                        ? `/outbreak?page=${currentPage + 1}&channel=${channelSlug}`
                        : `/outbreak?page=${currentPage + 1}`
                    }
                    className="rounded border border-z-gray/50 px-3 py-1 text-sm text-white hover:bg-z-gray/50"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
