import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Job Listing Premium',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      automatic_tax: {enabled: true},
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe API Error:', err);
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}


//line_items: [
//  {
//    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//    price: 'price_1PvKcb00ysrkPqsIp6YGq3qZ',
//    quantity: 1,
//  },
//],
//mode: 'payment',
//success_url: `${origin}/?success=true`,
