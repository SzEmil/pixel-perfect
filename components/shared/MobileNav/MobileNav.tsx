import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Routes } from '@/constants/endpoints';
import { SignedIn, UserButton, auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '../Navigation/Navigation';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { UserBalance } from '../Sidebar/components/UserBalance';

export const MobileNav = async () => {
  const { userId } = auth();
  if (!userId) redirect(Routes.signIn);
  const user = await getUserById(userId);
  return (
    <header className="header z-[9999]">
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
            <SheetContent className="sheet-content sm:w-64 max-h-screen overflow-y-scroll">
              <>
                <Image
                  src={'/logo.png'}
                  alt="logo"
                  width={152}
                  height={23}
                  className="mb-4"
                />
                <Navigation type="mobile" user={user} />
                <div className="p-4">
                  <UserBalance />
                </div>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
      </nav>
    </header>
  );
};
