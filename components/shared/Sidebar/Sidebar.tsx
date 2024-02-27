import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Routes } from '@/constants/endpoints';
import { Navigation } from '../Navigation/Navigation';
import { imageNavLinks, videoNavigationLinks } from '@/constants';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href={Routes.dashboard} className="sidebar-logo">
          <Image src="/logo.png" alt="logo" width={180} height={28} />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <div>
              <Navigation
                type="desktop"
                navLinks={imageNavLinks}
                title="📷 Image Transformation"
              />
              <Navigation
                type="desktop"
                navLinks={videoNavigationLinks}
                title="🎥 Video Transformation"
              />
            </div>
            <div className="flex items-center justify-start p-4 gap-2">
              <UserButton afterSignOutUrl={Routes.home} showName={true} />
            </div>
          </SignedIn>
        </nav>
      </div>
    </aside>
  );
};
