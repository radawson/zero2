import { prisma } from "./prisma";

export async function getOutbreakPosts() {
  return prisma.outbreakPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOutbreakPostBySlug(slug: string) {
  return prisma.outbreakPost.findUnique({
    where: { slug, published: true },
  });
}
