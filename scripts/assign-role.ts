/**
 * Assign a role to a user by email. Run after the user has signed in at least once.
 * Usage: npx tsx scripts/assign-role.ts <email> <ADMIN|AUTHOR|USER>
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const email = process.argv[2];
const role = process.argv[3];

if (!email || !role || !["ADMIN", "AUTHOR", "USER"].includes(role)) {
  console.error("Usage: npx tsx scripts/assign-role.ts <email> <ADMIN|AUTHOR|USER>");
  process.exit(1);
}

async function main() {
  const user = await prisma.user.update({
    where: { email },
    data: { role: role as "ADMIN" | "AUTHOR" | "USER" },
  });
  console.log(`Updated ${user.email} to role ${user.role}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
