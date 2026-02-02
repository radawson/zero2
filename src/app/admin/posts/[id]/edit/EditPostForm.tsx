"use client";

import { useRouter } from "next/navigation";
import { updatePostAction, deletePostAction } from "../../actions";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  channelId: string | null;
  channel: { id: string; name: string; slug: string } | null;
};

type Channel = { id: string; name: string; slug: string };

export function EditPostForm({
  post,
  channels,
  isAdmin,
}: {
  post: Post;
  channels: Channel[];
  isAdmin: boolean;
}) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      await updatePostAction(post.id, formData);
      router.push("/admin/posts");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to update post");
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePostAction(post.id);
      router.push("/admin/posts");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to delete post");
    }
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium text-z-black">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={post.title}
          required
          className="mt-1 w-full rounded border border-z-gray/30 px-3 py-2 text-z-black"
        />
      </div>
      <div>
        <label htmlFor="excerpt" className="block font-medium text-z-black">
          Excerpt (optional)
        </label>
        <input
          id="excerpt"
          name="excerpt"
          defaultValue={post.excerpt ?? ""}
          className="mt-1 w-full rounded border border-z-gray/30 px-3 py-2 text-z-black"
        />
      </div>
      <div>
        <label htmlFor="content" className="block font-medium text-z-black">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={post.content}
          required
          rows={10}
          className="mt-1 w-full rounded border border-z-gray/30 px-3 py-2 text-z-black"
        />
      </div>
      {isAdmin && channels.length > 0 && (
        <div>
          <label htmlFor="channelId" className="block font-medium text-z-black">
            Channel (optional)
          </label>
          <select
            id="channelId"
            name="channelId"
            defaultValue={post.channelId ?? ""}
            className="mt-1 w-full rounded border border-z-gray/30 px-3 py-2 text-z-black"
          >
            <option value="">— None —</option>
            {channels.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-z-black">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post.published}
            className="rounded"
          />
          Published
        </label>
        <button
          type="submit"
          className="rounded bg-z-green px-4 py-2 text-z-black hover:bg-z-green/90"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded border border-z-red px-4 py-2 text-z-red hover:bg-z-red/10"
        >
          Delete
        </button>
      </div>
    </form>
  );
}
