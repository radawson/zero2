"use client";

import { useCartStore } from "@/src/lib/cart/store";
import type { CartItem } from "@/src/lib/cart/types";

type Product = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  imageUrl: string | null;
};

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const item: Omit<CartItem, "quantity"> = {
    productId: product.id,
    name: product.name,
    slug: product.slug,
    priceCents: product.priceCents,
    imageUrl: product.imageUrl,
  };

  return (
    <button
      type="button"
      onClick={() => addItem(item, 1)}
      className="rounded bg-z-green px-6 py-3 font-medium text-white hover:opacity-90"
    >
      Add to cart
    </button>
  );
}
