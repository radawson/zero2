import "server-only";
import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) throw new Error("STRIPE_SECRET_KEY is not set");
    stripeInstance = new Stripe(secret, { apiVersion: "2026-01-28.clover" });
  }
  return stripeInstance;
}

export const stripe = {
  get checkout() {
    return getStripe().checkout;
  },
  get webhooks() {
    return getStripe().webhooks;
  },
};

export type CheckoutItem = {
  productId: string;
  name: string;
  quantity: number;
  priceCents: number;
};

export async function createCheckoutSession(
  items: CheckoutItem[],
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          metadata: { productId: item.productId },
        },
        unit_amount: item.priceCents,
      },
      quantity: item.quantity,
    })
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ["card"],
    // Apple Pay / Google Pay are available automatically in Checkout when supported
  });

  return session;
}
