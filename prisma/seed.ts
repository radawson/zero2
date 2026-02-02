import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
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
