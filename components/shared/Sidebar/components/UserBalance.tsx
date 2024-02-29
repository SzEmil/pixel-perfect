import { getCurrentUser } from '@/lib/actions/user.actions';
import React from 'react';
import { BiSolidCoinStack } from 'react-icons/bi';

export const UserBalance = async () => {
  const user = await getCurrentUser()
  return (
    <div className="flex gap-2 items-center text-black dark:text-white">
      <BiSolidCoinStack size={24} />
      <p className="font-[600]">
        Credits: <span className="font-[400]">{user?.creditBalance ?? 0}</span>
      </p>
    </div>
  );
};
