"use client";

import { useState } from "react";
import {
  createChannelAction,
  assignAuthorAction,
  removeAuthorAction,
} from "./actions";

type Channel = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  authors: Array<{ userId: string; user: { id: string; email: string | null; name: string | null } }>;
};

type User = {
  id: string;
  email: string | null;
  name: string | null;
  role: string;
};

export function ChannelManagement({
  channels,
  users,
}: {
  channels: Channel[];
  users: User[];
}) {
  const [loading, setLoading] = useState(false);

  async function handleCreateChannel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      await createChannelAction(formData);
      form.reset();
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleAssign(channelId: string, userId: string) {
    try {
      await assignAuthorAction(channelId, userId);
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    }
  }

  async function handleRemove(channelId: string, userId: string) {
    try {
      await removeAuthorAction(channelId, userId);
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    }
  }

  const authorUsers = users.filter((u) => u.role === "AUTHOR" || u.role === "ADMIN");

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-4 font-bold text-z-black">Create channel</h3>
        <form onSubmit={handleCreateChannel} className="max-w-md space-y-2">
          <input
            name="name"
            placeholder="Channel name"
            required
            className="w-full rounded border border-z-gray/30 px-3 py-2 text-z-black"
          />
          <input
            name="description"
            placeholder="Description (optional)"
            className="w-full rounded border border-z-gray/30 px-3 py-2 text-z-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-z-green px-4 py-2 text-z-black hover:bg-z-green/90 disabled:opacity-50"
          >
            Create channel
          </button>
        </form>
      </section>

      <section>
        <h3 className="mb-4 font-bold text-z-black">Channels and authors</h3>
        <ul className="space-y-4">
          {channels.map((channel) => (
            <li
              key={channel.id}
              className="rounded border border-z-gray/20 bg-white/80 p-4"
            >
              <div className="font-medium text-z-black">{channel.name}</div>
              {channel.description && (
                <p className="mt-1 text-sm text-z-gray">{channel.description}</p>
              )}
              <div className="mt-2 text-sm">
                <span className="text-z-gray">Authors: </span>
                {channel.authors.length === 0 ? (
                  <span className="text-z-gray">None</span>
                ) : (
                  channel.authors.map((a) => (
                    <span key={a.userId} className="mr-2 inline-flex items-center gap-1">
                      {a.user.email ?? a.user.name ?? a.userId}
                      <button
                        type="button"
                        onClick={() => handleRemove(channel.id, a.userId)}
                        className="text-z-red hover:underline"
                      >
                        Remove
                      </button>
                    </span>
                  ))
                )}
              </div>
              <div className="mt-2">
                <select
                  className="rounded border border-z-gray/30 px-2 py-1 text-sm text-z-black"
                  onChange={(e) => {
                    const uid = e.target.value;
                    if (uid) {
                      handleAssign(channel.id, uid);
                      e.target.value = "";
                    }
                  }}
                >
                  <option value="">Add author…</option>
                  {authorUsers
                    .filter(
                      (u) => !channel.authors.some((a) => a.userId === u.id)
                    )
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.email ?? u.name ?? u.id}
                      </option>
                    ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
        {channels.length === 0 && (
          <p className="text-z-gray">No channels yet. Create one above.</p>
        )}
      </section>
    </div>
  );
}
