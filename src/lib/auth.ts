import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Keycloak from "next-auth/providers/keycloak";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { prisma } from "@/src/lib/prisma";
import type { Adapter } from "next-auth/adapters";
import type { Role } from "@prisma/client";

const providers = [
  process.env.KEYCLOAK_CLIENT_ID &&
    process.env.KEYCLOAK_CLIENT_SECRET &&
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  process.env.FACEBOOK_CLIENT_ID &&
    process.env.FACEBOOK_CLIENT_SECRET &&
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
].filter(Boolean);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: providers as NextAuthOptions["providers"],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: Role }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role as "USER" | "AUTHOR" | "ADMIN" | undefined;
      }
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/auth/signin",
  },
};
