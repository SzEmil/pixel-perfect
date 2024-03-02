'use server';

import Stripe from 'stripe';
import Transaction from '../database/models/transaction.model';
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import { getUserById, updateCredits, updateUserPlan } from './user.actions';

export const checkoutCredits = async (
  transaction: CheckoutTransactionParams
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = +transaction.amount * 100;

  const user = await getUserById(transaction.buyerId);

  if (!user) throw new Error('User for payment not found');
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          // recurring: {
          //   interval: 'month',
          //   interval_count: 1,
          // },
          product_data: {
            name: transaction.plan,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      planId: transaction.planId,
      credits: transaction.credits,
      buyerId: transaction.buyerId,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
  });

  if (!session) throw new Error('Error during creating payment session');

  redirect(session.url as string);
};

export const createTransaction = async (
  transaction: CheckoutTransactionParams
) => {
  try {
    await connectToDatabase();

    const user = await getUserById(transaction.buyerId);

    if (!user) throw new Error('User for create transaction not found');

    const newTransaction = await Transaction.create({
      ...transaction,
      buyer: transaction.buyerId,
    });

    await updateCredits(transaction.buyerId, transaction.credits);

    if (transaction.planId !== 1) {
      await updateUserPlan(transaction.buyerId, transaction.planId);
    }
    return JSON.parse(JSON.stringify(newTransaction));
  } catch (e) {
    handleError(e);
  }
};
