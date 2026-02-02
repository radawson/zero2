"use client";

import { useState, useCallback } from "react";

type FeaturedImageUploadProps = {
  name: string;
  defaultValue?: string | null;
};

export function FeaturedImageUpload({ name, defaultValue }: FeaturedImageUploadProps) {
  const [url, setUrl] = useState<string | null>(defaultValue ?? null);
  const [uploading, setUploading] = useState(false);

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const { url: newUrl } = await res.json();
      setUrl(newUrl);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
    e.target.value = "";
  }, []);

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url ?? ""} />
      <label className="block font-medium text-z-black">Featured image (optional)</label>
      {url ? (
        <div className="flex flex-wrap items-start gap-3">
          <img
            src={url}
            alt="Featured"
            className="h-32 w-auto rounded border border-z-gray/30 object-cover"
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setUrl(null)}
              className="rounded border border-z-red/50 px-3 py-1 text-sm text-z-red hover:bg-z-red/10"
            >
              Remove
            </button>
            <label className="cursor-pointer rounded border border-z-gray/50 px-3 py-1 text-sm text-z-black hover:bg-z-gray/30">
              Replace
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="sr-only"
                onChange={handleFile}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      ) : (
        <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-z-gray/50 bg-z-gray/20 px-3 py-2 text-sm text-z-black hover:bg-z-gray/30">
          <span>{uploading ? "Uploading…" : "Choose image"}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="sr-only"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
