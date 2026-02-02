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
        <h1 className="mb-6 text-3xl font-bold text-z-black">Cart</h1>
        <p className="text-z-black/70">Loading cart…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-z-black">Cart</h1>
        <p className="mb-4 text-z-black/70">Your cart is empty.</p>
        <Link
          href="/shopping"
          className="inline-block rounded bg-z-green px-4 py-2 font-medium text-white hover:opacity-90"
        >
          Browse merchandise
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-z-black">Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-wrap items-center gap-4 rounded-lg border border-z-black/10 bg-white p-4 shadow-sm"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-z-black/5">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-z-black/30">
                  No img
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-z-black">{item.name}</p>
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
                className="w-16 rounded border border-z-black/20 px-2 py-1 text-center"
              />
              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                className="rounded border border-red-300 px-2 py-1 text-sm text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
            <p className="w-20 text-right font-medium">
              ${((item.priceCents * item.quantity) / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-z-black/10 pt-6">
        <p className="text-xl font-bold text-z-black">
          Total ({itemCount} item{itemCount !== 1 ? "s" : ""}): $
          {(totalCents / 100).toFixed(2)}
        </p>
        <div className="flex gap-3">
          <Link
            href="/shopping"
            className="rounded border border-z-black/20 px-4 py-2 font-medium hover:bg-z-black/5"
          >
            Continue shopping
          </Link>
          <Link
            href="/cart/checkout"
            className="rounded bg-z-green px-4 py-2 font-medium text-white hover:opacity-90"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
