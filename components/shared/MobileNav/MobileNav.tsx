import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Routes } from '@/constants/endpoints';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navigation } from '../Navigation/Navigation';
import { imageNavLinks, videoNavigationLinks } from '@/constants';

export const MobileNav = () => {
  return (
    <header className="header">
      <Link href={Routes.dashboard} className="flex items-center gap-2 md:py-2">
        <Image src={'/logo.png'} alt="logo" width={180} height={28} />
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl={Routes.home} />

          <Sheet>
            <SheetTrigger>
              <Image
                src={'/assets/icons/menu.svg'}
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src={'/logo.png'}
                  alt="logo"
                  width={152}
                  height={23}
                  className="mb-4"
                />
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
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
      </nav>
    </header>
  );
};
