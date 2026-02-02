/** Cart item shape (serializable for Zustand persist). */
export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  priceCents: number;
  imageUrl: string | null;
  quantity: number;
}
