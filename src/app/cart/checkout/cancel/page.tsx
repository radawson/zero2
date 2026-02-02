import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold text-z-black">Checkout cancelled</h1>
      <p className="mb-6 text-z-black/70">
        Your order was not completed. Your cart is unchanged.
      </p>
      <div className="flex gap-3">
        <Link
          href="/cart"
          className="rounded bg-z-green px-4 py-2 font-medium text-white hover:opacity-90"
        >
          Back to cart
        </Link>
        <Link
          href="/shopping"
          className="rounded border border-z-black/20 px-4 py-2 font-medium hover:bg-z-black/5"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
