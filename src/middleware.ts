import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/admin")) return NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  if (!token) {
    const signIn = new URL("/auth/signin", req.url);
    signIn.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signIn);
  }

  const role = token.role as string | undefined;
  if (role !== "ADMIN" && role !== "AUTHOR") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
