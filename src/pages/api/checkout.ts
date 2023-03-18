import { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "@/lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lineItems } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed!" });
  }

  if (!lineItems || !lineItems?.length) {
    return res.status(400).json({ error: "Price not found!" });
  }

  console.log("checkout line items:", lineItems);

  const successUrl = `${
    process.env.NEXT_URL as string
  }/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL as string}/`;
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: lineItems,
    // line_items: [
    //   { price: priceId, quantity: 1, },
    // ]
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
