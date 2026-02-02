"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/src/lib/cart/store";
import type { CartItem } from "@/src/lib/cart/types";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
};

export function ProductGrid({ products }: { products: Product[] }) {
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd(product: Product) {
    const item: Omit<CartItem, "quantity"> = {
      productId: product.id,
      name: product.name,
      slug: product.slug,
      priceCents: product.priceCents,
      imageUrl: product.imageUrl,
    };
    addItem(item, 1);
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <article
          key={p.id}
          className="flex flex-col overflow-hidden rounded-lg border border-z-black/10 bg-white shadow-sm"
        >
          <div className="relative aspect-square bg-z-black/5">
            {p.imageUrl ? (
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-z-black/30">
                No image
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h2 className="font-bold text-z-black">{p.name}</h2>
            {p.description && (
              <p className="mt-1 flex-1 text-sm text-z-black/70">{p.description}</p>
            )}
            <p className="mt-2 font-semibold text-z-green">
              ${(p.priceCents / 100).toFixed(2)}
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/shopping/${p.slug}`}
                className="flex-1 rounded border border-z-black/20 px-3 py-2 text-center text-sm font-medium hover:bg-z-black/5"
              >
                View
              </Link>
              <button
                type="button"
                onClick={() => handleAdd(p)}
                className="flex-1 rounded bg-z-green px-3 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Add to cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
