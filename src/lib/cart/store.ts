"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalCents: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalCents: () =>
        get().items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "zero-cart" }
  )
);
