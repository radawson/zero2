"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePostAction, togglePostPublishedAction } from "./actions";

type Post = {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  createdAt: Date;
  channel: { id: string; name: string } | null;
  author: { id: string; name: string | null; email: string } | null;
};

export function PostsTable({ posts }: { posts: Post[] }) {
  const router = useRouter();

  async function handleToggle(id: string) {
    try {
      await togglePostPublishedAction(id);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to toggle");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePostAction(id);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    }
  }

  if (posts.length === 0) {
    return (
      <p className="rounded-lg border border-z-gray/30 bg-z-black/60 px-4 py-6 text-z-gray">
        No posts yet. <Link href="/admin/posts/new" className="text-z-green hover:underline">Create one</Link>.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-z-gray/30 bg-z-black/60">
      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead>
          <tr className="border-b border-z-gray/30">
            <th className="px-4 py-3 font-medium text-z-black">Title</th>
            <th className="px-4 py-3 font-medium text-z-black">Status</th>
            <th className="px-4 py-3 font-medium text-z-black">Channel</th>
            <th className="px-4 py-3 font-medium text-z-black">Author</th>
            <th className="px-4 py-3 font-medium text-z-black">Date</th>
            <th className="px-4 py-3 font-medium text-z-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-z-gray/20 last:border-0">
              <td className="px-4 py-3">
                <Link
                  href={`/outbreak/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-z-green hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    post.published
                      ? "rounded bg-z-green/20 px-2 py-0.5 text-sm text-z-green"
                      : "rounded bg-z-gray/50 px-2 py-0.5 text-sm text-z-gray"
                  }
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-4 py-3 text-z-black">
                {post.channel?.name ?? "—"}
              </td>
              <td className="px-4 py-3 text-z-black">
                {post.author?.name ?? post.author?.email ?? "—"}
              </td>
              <td className="px-4 py-3 text-z-black">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="rounded border border-z-gray/50 px-2 py-1 text-sm text-z-black hover:bg-z-gray/30"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleToggle(post.id)}
                    className="rounded border border-z-gray/50 px-2 py-1 text-sm text-z-black hover:bg-z-gray/30"
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    className="rounded border border-z-red/50 px-2 py-1 text-sm text-z-red hover:bg-z-red/10"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
