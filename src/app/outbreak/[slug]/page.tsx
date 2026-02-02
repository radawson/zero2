import Link from "next/link";
import { notFound } from "next/navigation";
import { getOutbreakPostBySlug } from "@/src/lib/outbreak";

type Props = { params: Promise<{ slug: string }> };

export default async function OutbreakPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getOutbreakPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="container mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/outbreak"
        className="mb-6 inline-block text-z-purple hover:text-z-red"
      >
        ← Back to Outbreak
      </Link>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-z-black">{post.title}</h1>
        <time
          dateTime={post.createdAt.toISOString()}
          className="mt-2 block text-sm text-z-gray"
        >
          {post.createdAt.toLocaleDateString()}
        </time>
      </header>
      <div className="max-w-none whitespace-pre-wrap text-z-gray">
        {post.content}
      </div>
    </article>
  );
}
