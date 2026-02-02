import Link from "next/link";
import { ClearCartOnSuccess } from "./ClearCartOnSuccess";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="panel panel-glow mx-auto max-w-md p-8 text-white">
        <ClearCartOnSuccess />
        <h1 className="mb-4 text-3xl font-bold text-shadow">Thank you</h1>
        <p className="mb-6 text-white/80">
          Your payment was successful. You will receive an order confirmation shortly.
        </p>
        <Link href="/shopping" className="btn-primary inline-block">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
