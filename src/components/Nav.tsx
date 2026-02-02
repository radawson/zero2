"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export function Nav() {
  const [collapsed, setCollapsed] = useState(true);
  const { data: session, status } = useSession();

  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 border-b border-z-gray/50 bg-z-black/85 px-4 py-2 text-white backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2 font-bold text-shadow">
        <Image
          src="/images/zeropatch-lg.png"
          alt="ZERO Logo"
          width={80}
          height={80}
          className="relative"
        />
        ZERO
      </Link>
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="rounded-lg border border-z-gray/50 px-3 py-2 transition-colors hover:border-z-green/50 hover:text-z-green md:hidden"
        aria-label="Toggle menu"
      >
        <span className="block h-0.5 w-6 bg-current" />
        <span className="mt-1 block h-0.5 w-6 bg-current" />
        <span className="mt-1 block h-0.5 w-6 bg-current" />
      </button>
      <div
        className={`w-full md:flex md:w-auto md:items-center ${
          collapsed ? "hidden" : "block"
        }`}
      >
        <ul className="flex flex-col gap-1 rounded-lg border border-z-gray/30 bg-z-black/60 py-2 backdrop-blur-sm md:flex-row md:border-0 md:bg-transparent md:py-0 md:backdrop-blur-none">
          <li>
            <Link href="/" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
              Home
            </Link>
          </li>
          <li>
            <Link href="/outbreak" className="block px-3 py-2 font-bold transition-colors hover:text-z-green md:px-2 md:py-1">
              Outbreak
            </Link>
          </li>
          <li>
            <Link href="/join" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
              Join
            </Link>
          </li>
          <li>
            <Link href="/shopping" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
              Merchandise
            </Link>
          </li>
          <li>
            <Link href="/news" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
              News
            </Link>
          </li>
          <li>
            <Link href="/about" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
              About
            </Link>
          </li>
          <li>
            <Link href="/cart" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
              Cart
            </Link>
          </li>
          <li>
            <Link href="/test" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
              Test
            </Link>
          </li>
          {status === "authenticated" ? (
            <>
              {(session.user?.role === "ADMIN" || session.user?.role === "AUTHOR") && (
                <li>
                  <Link href="/admin" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full px-3 py-2 text-left transition-colors hover:text-z-green md:w-auto md:px-2 md:py-1"
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth/signin" className="block px-3 py-2 transition-colors hover:text-z-green md:px-2 md:py-1">
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
