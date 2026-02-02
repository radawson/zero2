import Link from "next/link";
import { CheckoutForm } from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-z-black">Checkout</h1>
      <CheckoutForm />
      <p className="mt-4 text-sm text-z-black/70">
        <Link href="/cart" className="text-z-green hover:underline">
          ← Back to cart
        </Link>
      </p>
    </div>
  );
}
