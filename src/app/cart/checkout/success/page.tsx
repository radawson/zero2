import Link from "next/link";
import { ClearCartOnSuccess } from "./ClearCartOnSuccess";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ClearCartOnSuccess />
      <h1 className="mb-4 text-3xl font-bold text-z-black">Thank you</h1>
      <p className="mb-6 text-z-black/70">
        Your payment was successful. You will receive an order confirmation shortly.
      </p>
      <Link
        href="/shopping"
        className="inline-block rounded bg-z-green px-4 py-2 font-medium text-white hover:opacity-90"
      >
        Continue shopping
      </Link>
    </div>
  );
}
