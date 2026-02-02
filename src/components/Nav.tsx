"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Nav() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 bg-z-black/90 px-4 py-2 text-white">
      <Link href="/" className="flex items-center gap-2 font-bold">
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
        className="rounded border border-white/50 px-3 py-1 md:hidden"
        aria-label="Toggle menu"
      >
        <span className="block h-0.5 w-6 bg-white" />
        <span className="mt-1 block h-0.5 w-6 bg-white" />
        <span className="mt-1 block h-0.5 w-6 bg-white" />
      </button>
      <div
        className={`w-full md:flex md:w-auto md:items-center ${
          collapsed ? "hidden" : "block"
        }`}
      >
        <ul className="flex flex-col gap-1 py-2 md:flex-row md:gap-4 md:py-0">
          <li>
            <Link href="/" className="block px-2 py-1 hover:text-z-green">
              Home
            </Link>
          </li>
          <li>
            <Link href="/outbreak" className="block px-2 py-1 font-bold hover:text-z-green">
              Outbreak
            </Link>
          </li>
          <li>
            <Link href="/join" className="block px-2 py-1 hover:text-z-green">
              Join
            </Link>
          </li>
          <li>
            <Link href="/shopping" className="block px-2 py-1 hover:text-z-green">
              Merchandise
            </Link>
          </li>
          <li>
            <Link href="/news" className="block px-2 py-1 hover:text-z-green">
              News
            </Link>
          </li>
          <li>
            <Link href="/about" className="block px-2 py-1 hover:text-z-green">
              About
            </Link>
          </li>
          <li>
            <Link href="/cart" className="block px-2 py-1 hover:text-z-green">
              Cart
            </Link>
          </li>
          <li>
            <Link href="/test" className="block px-2 py-1 hover:text-z-green">
              Test
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
