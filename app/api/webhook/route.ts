// app/api/webhook/route.ts

import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs"; // REQUIRED FOR STRIPE WEBHOOKS

export async function POST(req: NextRequest) {
  const body = await req.text();

  const headerList = await headers();
  const signature = headerList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  // ✅ Correct environment-based secret resolution
  const webhookSecret =
    process.env.VERCEL === "1"
      ? process.env.VERCEL_STRIPE_WEBHOOK_SECRET
      : process.env.SSTRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe webhook secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("❌ Stripe signature error:", error);
    return new NextResponse(
      `Webhook Error: ${(error as Error).message}`,
      { status: 400 }
    );
  }

  // ✅ Process successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await createOrderInSanity(session);
      console.log("✅ Order saved to Sanity:", session.id);
    } catch (error) {
      console.error("❌ Failed creating order:", error);
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

/* ---------------------------------------------------
   CREATE ORDER DOCUMENT
----------------------------------------------------*/

async function createOrderInSanity(
  session: Stripe.Checkout.Session
) {
  const {
    id,
    amount_total,
    currency,
    payment_intent,
    customer,
    total_details,
    metadata,
    customer_details,
  } = session;

  const {
    orderNumber,
    customerName,
    customerEmail,
    clerkUserId,
  } = metadata ?? {};

  // ✅ Fetch line-items & expand products
  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const products = lineItems.data.map((item) => {
    const product = item.price?.product as Stripe.Product | null;

    return {
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: product?.metadata?.id || "",
      },
      quantity: item.quantity ?? 1,
    };
  });

  // ✅ Create Sanity order
  return backendClient.create({
    _type: "order",

    orderNumber: orderNumber ?? id,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent as string,
    stripeCustomerId: customer as string,

    clerkUserId: clerkUserId ?? "",

    customerName:
      customerName ??
      customer_details?.name ??
      "Guest Customer",

    customerEmail:
      customerEmail ??
      customer_details?.email ??
      "",

    products,

    totalPrice: (amount_total ?? 0) / 100,
    currency,

    amountDiscount:
      (total_details?.amount_discount ?? 0) / 100,

    status: "paid",

    // ✅ THIS WAS THE FINAL MISSING FIX
    orderDate: new Date().toISOString(),
  });
}
