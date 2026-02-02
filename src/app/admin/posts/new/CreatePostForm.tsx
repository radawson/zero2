"use client";

import { useRouter } from "next/navigation";
import { createPostAction } from "../actions";
import { MarkdownEditor } from "@/src/components/MarkdownEditor";
import { FeaturedImageUpload } from "@/src/components/FeaturedImageUpload";

export function CreatePostForm({
  channels,
}: {
  channels: Array<{ id: string; name: string }>;
}) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      await createPostAction(formData);
      router.push("/admin/posts");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to create post");
    }
  }

  return (
    <form action={handleSubmit} className="max-w-4xl space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium text-z-black">
          Title
        </label>
        <input
          id="title"
          name="title"
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
          className="mt-1 w-full rounded border border-z-gray/30 px-3 py-2 text-z-black"
        />
      </div>
      <FeaturedImageUpload name="featuredImage" />
      <div>
        <label htmlFor="content" className="block font-medium text-z-black">
          Content
        </label>
        <MarkdownEditor name="content" id="content" minHeight="320px" />
      </div>
      {channels.length > 0 && (
        <div>
          <label htmlFor="channelId" className="block font-medium text-z-black">
            Channel (optional)
          </label>
          <select
            id="channelId"
            name="channelId"
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
          <input type="checkbox" name="published" className="rounded" />
          Published
        </label>
        <button
          type="submit"
          className="rounded bg-z-green px-4 py-2 text-z-black hover:bg-z-green/90"
        >
          Create post
        </button>
      </div>
    </form>
  );
}
