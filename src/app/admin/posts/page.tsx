import Link from "next/link";
import { getAdminPosts } from "@/src/lib/admin";
import { PostsTable } from "./PostsTable";

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-z-black">Posts</h2>
        <Link
          href="/admin/posts/new"
          className="rounded bg-z-green px-4 py-2 font-medium text-z-black hover:bg-z-green/90"
        >
          New post
        </Link>
      </div>
      <PostsTable posts={posts} />
    </div>
  );
}
