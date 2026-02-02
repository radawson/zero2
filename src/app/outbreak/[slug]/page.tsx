import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getOutbreakPostBySlug } from "@/src/lib/outbreak";

type Props = { params: Promise<{ slug: string }> };

export default async function OutbreakPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getOutbreakPostBySlug(slug);

  if (!post) notFound();

  const author = post.author as { id: string; name: string | null; email: string } | null;
  const channel = post.channel as { id: string; name: string; slug: string } | null;

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="panel panel-glow mx-auto max-w-2xl overflow-hidden text-white">
        {post.featuredImage && (
          <div className="relative h-48 w-full sm:h-64">
            <img
              src={post.featuredImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="p-8">
          <Link
            href="/outbreak"
            className="mb-6 inline-block text-z-green transition-colors hover:text-z-green/80"
          >
            ← Back to Outbreak
          </Link>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-shadow">{post.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-z-green/90">
              <time dateTime={post.createdAt.toISOString()}>
                {post.createdAt.toLocaleDateString()}
              </time>
              {author && (
                <span>{author.name ?? author.email}</span>
              )}
              {channel && (
                <Link
                  href={`/outbreak?channel=${channel.slug}`}
                  className="text-white/80 hover:text-z-green"
                >
                  {channel.name}
                </Link>
              )}
            </div>
          </header>
          <div className="markdown-prose max-w-none text-white/90 text-shadow">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}
