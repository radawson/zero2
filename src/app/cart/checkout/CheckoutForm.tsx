"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/src/lib/cart/store";

export function CheckoutForm() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = useCartStore((s) => s.items);
  const totalCents = useCartStore((s) => s.totalCents());

  useEffect(() => setMounted(true), []);

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            quantity: i.quantity,
            priceCents: i.priceCents,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) {
    return <p className="text-z-black/70">Loading…</p>;
  }

  if (items.length === 0) {
    return (
      <>
        <p className="text-z-black/70">Your cart is empty.</p>
        <Link
          href="/shopping"
          className="mt-4 inline-block rounded bg-z-green px-4 py-2 font-medium text-white hover:opacity-90"
        >
          Browse merchandise
        </Link>
      </>
    );
  }

  return (
    <div className="max-w-lg">
      <p className="mb-4 text-z-black/70">
        Total: <strong className="text-z-black">${(totalCents / 100).toFixed(2)}</strong>
      </p>
      {error && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="rounded bg-z-green px-6 py-3 font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Pay with Stripe (card, Apple Pay, Google Pay)"}
      </button>
    </div>
  );
}
