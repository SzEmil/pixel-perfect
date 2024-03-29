'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { checkoutCredits } from '@/lib/actions/transaction.action';
import { Button } from '@/components/ui/button';

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
  planId,
}: {
  plan: string;
  planId: number;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      toast({
        title: 'Order placed!',
        description: 'You will receive an email confirmation',
        duration: 5000,
        className: 'success-toast',
      });
    }

    if (query.get('canceled')) {
      toast({
        title: 'Order canceled!',
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: 'error-toast',
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      planId,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          disabled={planId === 1}
          className={`${planId === 1 && 'pointer-events-none'}
           w-full rounded-full bg-gradient-to-br from-green-300 to-green-500 bg-cover text-white`}
        >
          {planId === 1 ? 'Active for new users' : 'Change Plan'}
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
