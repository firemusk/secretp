import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function GET(request: NextRequest) {
  try {
    const prices = await stripe.prices.list({
      currency: 'eur',
      active: true,
    });

    return NextResponse.json({ prices: prices.data });
  } catch (err: any) {
    console.error('Stripe API Error:', err);
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
