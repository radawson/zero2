"use server";

import {
  createPost,
  updatePost,
  deletePost,
  togglePostPublished,
} from "@/src/lib/admin";

export async function createPostAction(formData: FormData) {
  await createPost(formData);
}

export async function updatePostAction(id: string, formData: FormData) {
  await updatePost(id, formData);
}

export async function deletePostAction(id: string) {
  await deletePost(id);
}

export async function togglePostPublishedAction(id: string) {
  await togglePostPublished(id);
}
