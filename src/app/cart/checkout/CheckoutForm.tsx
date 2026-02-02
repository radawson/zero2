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
    return <p className="text-white/70">Loading…</p>;
  }

  if (items.length === 0) {
    return (
      <>
        <p className="text-white/70">Your cart is empty.</p>
        <Link href="/shopping" className="btn-primary mt-4 inline-block">
          Browse merchandise
        </Link>
      </>
    );
  }

  return (
    <div className="max-w-lg">
      <p className="mb-4 text-white/80">
        Total: <strong className="text-white text-shadow">${(totalCents / 100).toFixed(2)}</strong>
      </p>
      {error && (
        <p className="mb-4 rounded border border-z-red/50 bg-z-red/20 p-3 text-sm text-z-red">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="btn-primary disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Pay with Stripe (card, Apple Pay, Google Pay)"}
      </button>
    </div>
  );
}
