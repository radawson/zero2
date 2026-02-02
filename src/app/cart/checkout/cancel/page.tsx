import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-md p-8 text-white">
        <h1 className="mb-4 text-3xl font-bold text-shadow">Checkout cancelled</h1>
        <p className="mb-6 text-white/80">
          Your order was not completed. Your cart is unchanged.
        </p>
        <div className="flex gap-3">
          <Link href="/cart" className="btn-primary">
            Back to cart
          </Link>
          <Link href="/shopping" className="btn-secondary">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
