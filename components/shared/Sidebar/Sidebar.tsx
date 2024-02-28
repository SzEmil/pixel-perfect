import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '@/constants/endpoints';
import { Navigation } from '../Navigation/Navigation';
import {
  getCurrentUser,
  getUserCreditsBalance,
} from '@/lib/actions/user.actions';
import { BiSolidCoinStack } from 'react-icons/bi';

export const Sidebar = async () => {
  const user = await getCurrentUser();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href={Routes.dashboard} className="sidebar-logo">
          <Image src="/logo.png" alt="logo" width={180} height={28} />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <Navigation type="desktop" />
            <div className="flex flex-col p-4 gap-4">
              <div className="flex gap-2 items-center text-black dark:text-white">
                <BiSolidCoinStack size={24} />
                <p className="font-[600]">
                  Credits:{' '}
                  <span className="font-[400]">{user.creditBalance}</span>
                </p>
              </div>
              <UserButton afterSignOutUrl={Routes.home} showName={true} />
            </div>
          </SignedIn>
        </nav>
      </div>
    </aside>
  );
};
