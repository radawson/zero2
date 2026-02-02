import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { getPostById, getAllChannels, getChannelsForAuthor } from "@/src/lib/admin";
import { EditPostForm } from "./EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/signin");

  const post = await getPostById(id);
  if (!post) notFound();

  const postAuthorId = (post as { authorId?: string | null }).authorId;
  if (session.user.role === "AUTHOR" && postAuthorId !== session.user.id) {
    redirect("/admin/posts");
  }

  const isAdmin = session.user.role === "ADMIN";
  const channelsRaw = isAdmin ? await getAllChannels() : [];
  const channels = channelsRaw.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));

  const channel = post.channel as { id: string; name: string; slug: string } | null;
  const postForForm = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? null,
    content: post.content,
    featuredImage: (post as { featuredImage?: string | null }).featuredImage ?? null,
    published: post.published,
    channelId: (post as { channelId?: string | null }).channelId ?? null,
    channel: channel ? { id: channel.id, name: channel.name, slug: channel.slug } : null,
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-z-black">Edit post</h2>
      <EditPostForm post={postForForm} channels={channels} isAdmin={isAdmin} />
    </div>
  );
}
