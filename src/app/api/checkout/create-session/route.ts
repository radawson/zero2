import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/src/lib/payments/stripe";

type BodyItem = { productId: string; name: string; quantity: number; priceCents: number };

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { items: BodyItem[] };
    const items = body?.items;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "items array required" },
        { status: 400 }
      );
    }

    const base = request.nextUrl.origin;
    const successUrl = `${base}/cart/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${base}/cart/checkout/cancel`;

    const session = await createCheckoutSession(items, successUrl, cancelUrl);

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout create-session error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
