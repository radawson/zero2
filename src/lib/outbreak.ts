import { prisma } from "./prisma";

const DEFAULT_PER_PAGE = 15;

export async function getOutbreakPosts(options?: {
  page?: number;
  perPage?: number;
  channelSlug?: string | null;
}) {
  const page = Math.max(1, options?.page ?? 1);
  const perPage = Math.min(50, Math.max(1, options?.perPage ?? DEFAULT_PER_PAGE));
  const skip = (page - 1) * perPage;

  const where: { published: true; channelId?: string | null } = { published: true };
  if (options?.channelSlug) {
    const channel = await prisma.outbreakChannel.findUnique({
      where: { slug: options.channelSlug },
      select: { id: true },
    });
    if (channel) where.channelId = channel.id;
  }

  const [posts, total] = await Promise.all([
    prisma.outbreakPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { id: true, name: true, email: true } }, channel: { select: { id: true, name: true, slug: true } } },
      skip,
      take: perPage,
    }),
    prisma.outbreakPost.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);
  return { posts, total, page, perPage, totalPages };
}

export async function getOutbreakChannels() {
  return prisma.outbreakChannel.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });
}

export async function getOutbreakPostBySlug(slug: string) {
  return prisma.outbreakPost.findUnique({
    where: { slug, published: true },
    include: { author: { select: { id: true, name: true, email: true } }, channel: { select: { id: true, name: true, slug: true } } },
  });
}
