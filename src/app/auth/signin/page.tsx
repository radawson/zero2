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
      <div className="panel panel-glow w-full max-w-md p-8 text-white">
        <h1 className="mb-8 text-center text-3xl font-bold text-white text-shadow">
          Sign in to ZERO
        </h1>

        <form
          onSubmit={handleCredentialsSubmit}
          className="mb-8 flex flex-col gap-4"
        >
          <h2 className="text-lg font-semibold text-z-green">Email and password</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-dark"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-dark"
            autoComplete="current-password"
          />
          {error && (
            <p className="rounded border border-z-red/50 bg-z-red/20 px-3 py-2 text-sm text-z-red">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in with email"}
          </button>
        </form>

        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-z-gray/50" />
          <span className="text-sm text-white/60">or continue with</span>
          <span className="h-px flex-1 bg-z-gray/50" />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="btn-secondary w-full"
          >
            Sign in with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("facebook", { callbackUrl: "/" })}
            className="btn-secondary w-full"
          >
            Sign in with Facebook
          </button>
          {process.env.NEXT_PUBLIC_KEYCLOAK_ENABLED === "true" && (
            <button
              type="button"
              onClick={() => signIn("keycloak", { callbackUrl: "/" })}
              className="btn-secondary w-full"
            >
              Sign in with Keycloak
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
