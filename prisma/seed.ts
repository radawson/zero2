import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const connectionString =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Local login user (see docs/LOGIN_PROVIDERS.md). Password: admin123
  const localPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { password: localPasswordHash },
    create: {
      email: "admin@example.com",
      name: "Local Admin",
      password: localPasswordHash,
      role: "ADMIN",
    },
  });

  await prisma.outbreakPost.upsert({
    where: { slug: "day-one" },
    update: {},
    create: {
      slug: "day-one",
      title: "Day One: The Outbreak Begins",
      excerpt: "The first signs of trouble appeared at dawn.",
      content: `The first signs of trouble appeared at dawn. Reports flooded in from the eastern districts—unusual behavior, aggression, something *wrong* with the people.

By noon, the streets were chaos. We didn't have a name for it yet. We didn't know what we were facing.

Z.E.R.O. was formed that night. Zombie Emergency Response Organization. Because someone had to be ready.`,
      published: true,
    },
  });

  await prisma.outbreakPost.upsert({
    where: { slug: "week-two" },
    update: {},
    create: {
      slug: "week-two",
      title: "Week Two: Holding the Line",
      excerpt: "The quarantine zones are holding. Barely.",
      content: `The quarantine zones are holding. Barely. We've lost three sectors but reclaimed one. Every day we learn more about how they move, how they hunt.

The survivors are gathering. We're building something here—a network of the prepared, the willing, the ones who refused to give up.

Join us. Be prepared.`,
      published: true,
    },
  });

  // Merchandise
  await prisma.product.upsert({
    where: { slug: "zero-patch" },
    update: {},
    create: {
      name: "Z.E.R.O. Patch",
      slug: "zero-patch",
      description: "Official embroidered patch. Show you're prepared.",
      priceCents: 899,
      imageUrl: "/images/zeropatch-lg.png",
    },
  });
  await prisma.product.upsert({
    where: { slug: "survival-kit" },
    update: {},
    create: {
      name: "Survival Kit",
      slug: "survival-kit",
      description: "Essential supplies for the first 72 hours.",
      priceCents: 4999,
      imageUrl: null,
    },
  });
  await prisma.product.upsert({
    where: { slug: "field-manual" },
    update: {},
    create: {
      name: "Field Manual",
      slug: "field-manual",
      description: "Printed guide: protocols, maps, and checklists.",
      priceCents: 1999,
      imageUrl: null,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
