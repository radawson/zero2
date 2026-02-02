"use client";

import { useEffect } from "react";
import { useCartStore } from "@/src/lib/cart/store";

export function ClearCartOnSuccess() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
