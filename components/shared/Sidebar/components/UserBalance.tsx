import { getCurrentUser } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import React from 'react';
import { BiSolidCoinStack } from 'react-icons/bi';

export const UserBalance = async () => {
  const { userId } = auth();
  if (!userId) return null;
  
  const user = await getCurrentUser(userId);
  return (
    userId && (
      <div className="flex gap-2 items-center text-black dark:text-white">
        <BiSolidCoinStack size={24} />
        <p className="font-[600]">
          Credits:{' '}
          <span className="font-[400]">{user?.creditBalance ?? 0}</span>
        </p>
      </div>
    )
  );
};
