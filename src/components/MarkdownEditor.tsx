"use client";

import { useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownEditorProps = {
  name: string;
  defaultValue?: string;
  id?: string;
  placeholder?: string;
  minHeight?: string;
};

function wrapSelection(text: string, start: number, end: number, before: string, after: string) {
  return text.slice(0, start) + before + text.slice(start, end) + after + text.slice(end);
}

function insertAtCursor(text: string, start: number, end: number, insertion: string) {
  return text.slice(0, start) + insertion + text.slice(end);
}

export function MarkdownEditor({
  name,
  defaultValue = "",
  id = "content",
  placeholder = "Write your post in Markdown...",
  minHeight = "320px",
}: MarkdownEditorProps) {
  const [content, setContent] = useState(defaultValue);
  const [previewActive, setPreviewActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertAtSelection = useCallback((before: string, after: string = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    setContent((prev) => wrapSelection(prev, start, end, before, after));
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  }, []);

  const insertBlock = useCallback((block: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const insertion = block + (block.endsWith("\n") ? "" : "\n");
    setContent((prev) => insertAtCursor(prev, start, end, insertion));
    setTimeout(() => {
      ta.focus();
      const newPos = start + insertion.length;
      ta.setSelectionRange(newPos, newPos);
    }, 0);
  }, []);

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif,image/webp";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const formData = new FormData();
        formData.set("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Upload failed");
        }
        const { url } = await res.json();
        const ta = textareaRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const insertion = `![${file.name.replace(/\.[^.]+$/, "")}](${url})`;
        setContent((prev) => insertAtCursor(prev, start, end, insertion));
        setTimeout(() => ta.focus(), 0);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    };
    input.click();
  }, []);

  return (
    <div className="markdown-editor">
      <input type="hidden" name={name} value={content} />
      <div className="markdown-editor-toolbar flex flex-wrap items-center gap-1 rounded-t-lg border border-z-gray/30 border-b-0 bg-z-gray/20 p-1">
        <button
          type="button"
          onClick={() => insertAtSelection("**", "**")}
          className="rounded px-2 py-1 text-sm font-bold text-z-black hover:bg-z-green"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => insertAtSelection("_", "_")}
          className="rounded px-2 py-1 text-sm italic text-z-black hover:bg-z-green"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => insertBlock("## ")}
          className="rounded px-2 py-1 text-sm text-z-black hover:bg-z-green"
          title="Heading"
        >
          H
        </button>
        <button
          type="button"
          onClick={() => insertAtSelection("[", "](url)")}
          className="rounded px-2 py-1 text-sm text-z-black hover:bg-z-green"
          title="Link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={uploading}
          className="rounded px-2 py-1 text-sm text-z-black hover:bg-z-green disabled:opacity-50"
          title="Upload image"
        >
          {uploading ? "…" : "Img"}
        </button>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setPreviewActive((v) => !v)}
            className="rounded px-2 py-1 text-sm text-z-black hover:bg-z-green"
          >
            {previewActive ? "Hide preview" : "Show preview"}
          </button>
        </div>
      </div>
      <div className="markdown-editor-body flex flex-col gap-0 border border-z-gray/30 rounded-b-lg sm:flex-row">
        <textarea
          ref={textareaRef}
          id={id}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 resize-y rounded-b-lg border-0 bg-z-black/60 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-z-green sm:rounded-b-none sm:rounded-bl-lg"
          style={{ minHeight }}
          spellCheck
        />
        {previewActive && (
          <div
            className="markdown-preview prose prose-invert flex-1 overflow-auto rounded-b-lg border-0 border-t border-z-gray/30 bg-z-black/40 px-3 py-2 sm:max-w-[50%] sm:border-t-0 sm:border-l"
            style={{ minHeight }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "*Nothing to preview*"}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
