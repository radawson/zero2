"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/src/lib/cart/store";

export function CartView() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalCents = useCartStore((s) => s.totalCents());
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="panel panel-glow mx-auto max-w-3xl p-8 text-white">
          <h1 className="mb-6 text-3xl font-bold text-shadow">Cart</h1>
          <p className="text-white/70">Loading cart…</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="panel panel-glow mx-auto max-w-3xl p-8 text-white">
          <h1 className="mb-6 text-3xl font-bold text-shadow">Cart</h1>
          <p className="mb-4 text-white/70">Your cart is empty.</p>
          <Link href="/shopping" className="btn-primary inline-block">
            Browse merchandise
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-3xl p-8 text-white">
        <h1 className="mb-6 text-3xl font-bold text-shadow">Cart</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-wrap items-center gap-4 rounded-lg border border-z-gray/50 bg-z-black/60 p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-z-gray/30">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-white/30">
                    No img
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-sm text-z-green">
                  ${(item.priceCents / 100).toFixed(2)} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor={`qty-${item.productId}`} className="sr-only">
                  Quantity
                </label>
                <input
                  id={`qty-${item.productId}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.productId, parseInt(e.target.value, 10) || 1)
                  }
                  className="input-dark w-16 text-center"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="rounded border border-z-red/50 px-2 py-1 text-sm text-z-red transition-colors hover:bg-z-red/20"
                >
                  Remove
                </button>
              </div>
              <p className="w-20 text-right font-medium text-white">
                ${((item.priceCents * item.quantity) / 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-z-gray/50 pt-6">
          <p className="text-xl font-bold text-white text-shadow">
            Total ({itemCount} item{itemCount !== 1 ? "s" : ""}): $
            {(totalCents / 100).toFixed(2)}
          </p>
          <div className="flex gap-3">
            <Link href="/shopping" className="btn-secondary">
              Continue shopping
            </Link>
            <Link href="/cart/checkout" className="btn-primary">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
