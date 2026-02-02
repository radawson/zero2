import Link from "next/link";
import { notFound } from "next/navigation";
import { getOutbreakPostBySlug } from "@/src/lib/outbreak";

type Props = { params: Promise<{ slug: string }> };

export default async function OutbreakPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getOutbreakPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="panel panel-glow mx-auto max-w-2xl p-8 text-white">
        <Link
          href="/outbreak"
          className="mb-6 inline-block text-z-green transition-colors hover:text-z-green/80"
        >
          ← Back to Outbreak
        </Link>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-shadow">{post.title}</h1>
          <time
            dateTime={post.createdAt.toISOString()}
            className="mt-2 block text-sm text-z-green/90"
          >
            {post.createdAt.toLocaleDateString()}
          </time>
        </header>
        <div className="max-w-none whitespace-pre-wrap text-white/90 text-shadow">
          {post.content}
        </div>
      </article>
    </div>
  );
}
