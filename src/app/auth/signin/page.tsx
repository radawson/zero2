"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-z-black">Sign in to ZERO</h1>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="rounded bg-z-black px-6 py-3 text-white hover:bg-z-gray"
        >
          Sign in with Google
        </button>
        <button
          type="button"
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
          className="rounded bg-z-black px-6 py-3 text-white hover:bg-z-gray"
        >
          Sign in with Facebook
        </button>
        {process.env.NEXT_PUBLIC_KEYCLOAK_ENABLED === "true" && (
          <button
            type="button"
            onClick={() => signIn("keycloak", { callbackUrl: "/" })}
            className="rounded bg-z-black px-6 py-3 text-white hover:bg-z-gray"
          >
            Sign in with Keycloak
          </button>
        )}
      </div>
    </div>
  );
}
