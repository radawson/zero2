import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { getAllChannels, getChannelsForAuthor } from "@/src/lib/admin";
import { CreatePostForm } from "./CreatePostForm";

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const isAdmin = session.user.role === "ADMIN";
  const channels = isAdmin
    ? await getAllChannels()
    : await getChannelsForAuthor(session.user.id);

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-z-black">New post</h2>
      <CreatePostForm channels={channels} />
    </div>
  );
}
