import Link from "next/link";
import { CheckoutForm } from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-2xl p-8 text-white">
        <h1 className="mb-6 text-3xl font-bold text-shadow">Checkout</h1>
        <CheckoutForm />
        <p className="mt-4 text-sm text-white/70">
          <Link href="/cart" className="text-z-green transition-colors hover:text-z-green/80">
            ← Back to cart
          </Link>
        </p>
      </div>
    </div>
  );
}
