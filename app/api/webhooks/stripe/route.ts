import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createTransaction } from '@/lib/actions/transaction.action';

export async function POST(req: Request, res: Response) {
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ message: `Webhook Error: ${err.message}` });
  }
  const eventType = event.type;
  switch (eventType) {
    case 'checkout.session.completed':
      const { id, amount_total, metadata } = event.data.object;

      const transaction = {
        stripeId: id,
        amount: amount_total ? amount_total / 10 : 0,
        plan: metadata?.plan ?? '',
        planId: +metadata?.planId! ?? 0,
        credits: +metadata?.credits! ?? 0,
        buyerId: metadata?.buyerId ?? '',
        createdAt: new Date(),
      };
      const newTransaction = await createTransaction(transaction);
      return NextResponse.json({ message: 'OK', transaction: newTransaction });
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response('', { status: 200 });
}
