import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminPosts() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  if (session.user.role === "ADMIN") {
    return prisma.outbreakPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { channel: true, author: true },
    });
  }

  const authorChannels = await prisma.channelAuthor.findMany({
    where: { userId: session.user.id },
    select: { channelId: true },
  });
  const channelIds = authorChannels.map((c) => c.channelId);

  return prisma.outbreakPost.findMany({
    where: { channelId: { in: channelIds } },
    orderBy: { createdAt: "desc" },
    include: { channel: true, author: true },
  });
}

export async function getChannelsForAuthor(userId: string) {
  const authorChannels = await prisma.channelAuthor.findMany({
    where: { userId },
    include: { channel: true },
  });
  return authorChannels.map((a) => a.channel);
}

export async function getAllChannels() {
  return prisma.outbreakChannel.findMany({
    orderBy: { name: "asc" },
    include: { authors: { include: { user: true } } },
  });
}

export async function getPostById(id: string) {
  return prisma.outbreakPost.findUnique({
    where: { id },
    include: { channel: true, author: true },
  });
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const featuredImage = (formData.get("featuredImage") as string) || null;
  const channelId = (formData.get("channelId") as string) || null;
  const published = formData.get("published") === "on";

  if (!title?.trim() || !content?.trim()) throw new Error("Title and content required");

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let n = 0;
  while (await prisma.outbreakPost.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${baseSlug}-${n}`;
  }

  if (session.user.role === "AUTHOR" && channelId) {
    const allowed = await prisma.channelAuthor.findUnique({
      where: { channelId_userId: { channelId, userId: session.user.id } },
    });
    if (!allowed) throw new Error("You are not an author of this channel");
  }

  await prisma.outbreakPost.create({
    data: {
      title: title.trim(),
      excerpt: excerpt?.trim() || null,
      content: content.trim(),
      featuredImage: featuredImage?.trim() || null,
      slug,
      published,
      authorId: session.user.id,
      channelId: channelId || null,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/outbreak");
}

export async function updatePost(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const post = await prisma.outbreakPost.findUnique({ where: { id } });
  if (!post) throw new Error("Post not found");

  if (session.user.role === "AUTHOR") {
    if (post.authorId !== session.user.id) throw new Error("You can only edit your own posts");
    if (post.channelId) {
      const allowed = await prisma.channelAuthor.findUnique({
        where: { channelId_userId: { channelId: post.channelId, userId: session.user.id } },
      });
      if (!allowed) throw new Error("You are not an author of this channel");
    }
  }

  const title = formData.get("title") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const featuredImage = (formData.get("featuredImage") as string) || null;
  const channelId = (formData.get("channelId") as string) || null;
  const published = formData.get("published") === "on";

  if (!title?.trim() || !content?.trim()) throw new Error("Title and content required");

  const data: Parameters<typeof prisma.outbreakPost.update>[0]["data"] = {
    title: title.trim(),
    excerpt: excerpt?.trim() || null,
    content: content.trim(),
    featuredImage: featuredImage?.trim() || null,
    published,
  };
  if (session.user.role === "ADMIN") {
    data.channelId = channelId || null;
  }

  await prisma.outbreakPost.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/posts");
  revalidatePath("/outbreak");
  revalidatePath(`/outbreak/${post.slug}`);
}

export async function deletePost(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const post = await prisma.outbreakPost.findUnique({ where: { id } });
  if (!post) throw new Error("Post not found");

  if (session.user.role === "AUTHOR" && post.authorId !== session.user.id) {
    throw new Error("You can only delete your own posts");
  }

  await prisma.outbreakPost.delete({ where: { id } });
  revalidatePath("/admin/posts");
  revalidatePath("/outbreak");
}

export async function togglePostPublished(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const post = await prisma.outbreakPost.findUnique({ where: { id } });
  if (!post) throw new Error("Post not found");

  if (session.user.role === "AUTHOR" && post.authorId !== session.user.id) {
    throw new Error("You can only change your own posts");
  }

  await prisma.outbreakPost.update({
    where: { id },
    data: { published: !post.published },
  });
  revalidatePath("/admin/posts");
  revalidatePath("/outbreak");
  revalidatePath(`/outbreak/${post.slug}`);
}

export async function createChannel(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") throw new Error("Admin only");

  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;
  if (!name?.trim()) throw new Error("Name required");

  const slug = slugify(name);
  const existing = await prisma.outbreakChannel.findUnique({ where: { slug } });
  if (existing) throw new Error("Channel slug already exists");

  await prisma.outbreakChannel.create({
    data: { name: name.trim(), slug, description: description?.trim() || null },
  });

  revalidatePath("/admin/channels");
}

export async function assignAuthorToChannel(channelId: string, userId: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") throw new Error("Admin only");

  await prisma.channelAuthor.upsert({
    where: { channelId_userId: { channelId, userId } },
    create: { channelId, userId },
    update: {},
  });

  revalidatePath("/admin/channels");
}

export async function removeAuthorFromChannel(channelId: string, userId: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") throw new Error("Admin only");

  await prisma.channelAuthor.delete({
    where: { channelId_userId: { channelId, userId } },
  });

  revalidatePath("/admin/channels");
}

export async function getUsers() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return [];

  return prisma.user.findMany({
    orderBy: { email: "asc" },
    select: { id: true, email: true, name: true, role: true },
  });
}
