import { SignedIn, SignedOut, UserButton, auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '@/constants/endpoints';
import { Navigation } from '../Navigation/Navigation';
import { UserBalance } from './components/UserBalance';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { User } from '@/lib/database/models/user.model';
import { getCurrentUser } from '@/lib/actions/user.actions';

export const Sidebar = async () => {
  const { userId } = auth();
  if (!userId) redirect(Routes.signIn);
  const user: User = await getCurrentUser(userId);
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href={Routes.dashboard} className="sidebar-logo">
          <Image src="/logo.png" alt="logo" width={180} height={28} />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <div className="overflow-y-scroll max-h-[700px]">
                <Navigation type="desktop" user={user} />
            </div>
          </SignedIn>
          <div className="flex flex-col p-4 gap-4">
            <UserBalance />
            <UserButton afterSignOutUrl={Routes.home} showName={true} />
          </div>
        </nav>
      </div>
    </aside>
  );
};
