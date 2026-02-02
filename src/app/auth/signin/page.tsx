"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    if (res?.url) window.location.href = res.url;
  }

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-z-black">Sign in to ZERO</h1>

      <form
        onSubmit={handleCredentialsSubmit}
        className="mb-10 flex w-full max-w-sm flex-col gap-4"
      >
        <h2 className="text-lg font-semibold text-z-black">Email and password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded border border-z-black/20 px-3 py-2"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded border border-z-black/20 px-3 py-2"
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-z-black px-6 py-3 text-white hover:bg-z-gray disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in with email"}
        </button>
      </form>

      <p className="mb-4 text-sm text-z-black/60">Or sign in with:</p>
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
