import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/src/lib/payments/stripe";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  const raw = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Webhook signature verification failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const paymentId = session.payment_intent ?? session.id;

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price"],
    });

    const orderItems: { productId: string; quantity: number; priceCents: number }[] = [];
    for (const line of lineItems.data) {
      const price = line.price as (Stripe.Price & { product_data?: { metadata?: { productId?: string } } }) | null;
      const productId =
        typeof price?.product_data === "object" && price.product_data?.metadata?.productId
          ? String(price.product_data.metadata.productId)
          : null;
      if (!productId || typeof line.amount_total !== "number") continue;
      const quantity = line.quantity ?? 1;
      const priceCents = Math.round((line.amount_total ?? 0) / quantity);
      orderItems.push({ productId, quantity, priceCents });
    }

    if (orderItems.length === 0) {
      return NextResponse.json({ error: "No line items" }, { status: 400 });
    }

    await prisma.order.create({
      data: {
        stripePaymentId: typeof paymentId === "string" ? paymentId : paymentId?.id ?? null,
        status: "paid",
        items: {
          create: orderItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            priceCents: i.priceCents,
          })),
        },
      },
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook create order error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Order creation failed" },
      { status: 500 }
    );
  }
}
