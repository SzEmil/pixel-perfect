import { SignedIn, auth } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Header } from '@/components/shared/Header/Header';
import { Button } from '@/components/ui/button';
import { plans } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import Checkout from '@/components/shared/Checkout/Checkout';
import { Routes } from '@/constants/endpoints';
import React from 'react';
import { getIcon } from '@/helpers/icons';

const CreditsPage = async () => {
  const { userId } = auth();

  if (!userId) redirect(Routes.signIn);
  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Find the credit plan that's perfect for you!"
      />

      <section>
        <ul className="credits-list">
          {plans.map(plan => (
            <li key={plan.name} className="credits-item">
              <div className="flex-center flex-col gap-3">
              {React.createElement(getIcon(plan.icon as any), { size: 42 })}
                <p className="p-20-semibold mt-2 text-green-500">{plan.name}</p>
                <p className="h1-semibold text-dark-600 dark:text-white">${plan.price}</p>
                <p className="p-16-regular">{plan.credits} Credits</p>
              </div>

              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map(inclusion => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? 'check.svg' : 'cross.svg'
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan._id === user.planId ? (
                <Button variant="outline" className="credits-btn pointer-events-none">
                  Current plan
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    planId={plan._id}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default CreditsPage;
