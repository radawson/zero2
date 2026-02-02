"use client";

import { signIn, getProviders } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type ProviderId = "google" | "facebook" | "keycloak";

const OAUTH_LABELS: Record<ProviderId, string> = {
  google: "Sign in with Google",
  facebook: "Sign in with Facebook",
  keycloak: "Sign in with Keycloak",
};

function SignInForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthProviders, setOauthProviders] = useState<ProviderId[]>([]);

  useEffect(() => {
    getProviders().then((providers) => {
      if (!providers) return;
      const ids: ProviderId[] = [];
      if (providers.google) ids.push("google");
      if (providers.facebook) ids.push("facebook");
      if (providers.keycloak) ids.push("keycloak");
      setOauthProviders(ids);
    });
  }, []);

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "Configuration") {
      setError("OAuth provider is not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (and similar for other providers) in .env — see docs/LOGIN_PROVIDERS.md.");
    } else if (err) {
      setError("Sign-in failed. Try again or use email and password.");
    }
  }, [searchParams]);

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

  function handleOAuthSignIn(providerId: ProviderId) {
    setError("");
    signIn(providerId, { callbackUrl: "/" });
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

        {oauthProviders.length > 0 && (
          <>
            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-z-gray/50" />
              <span className="text-sm text-white/60">or continue with</span>
              <span className="h-px flex-1 bg-z-gray/50" />
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {oauthProviders.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleOAuthSignIn(id)}
                  className="btn-secondary w-full"
                >
                  {OAUTH_LABELS[id]}
                </button>
              ))}
            </div>
          </>
        )}

        {oauthProviders.length === 0 && (
          <p className="mt-6 text-center text-sm text-white/60">
            Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (or other providers) to .env to enable social sign-in. See docs/LOGIN_PROVIDERS.md.
          </p>
        )}
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16 text-white">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
