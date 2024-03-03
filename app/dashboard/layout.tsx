import { MobileNav } from '@/components/shared/MobileNav/MobileNav';
import { Sidebar } from '@/components/shared/Sidebar/Sidebar';
import { SignedIn, auth } from '@clerk/nextjs';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // const { userId } = auth();
  // if (userId) {
  //   redirect(Routes.home);
  // }
  return (
    <main className="root">
      <SignedIn>
          <Sidebar />
          <MobileNav />
        <div className="root-container">
          <div className="wrapper"> {children}</div>
        </div>
      </SignedIn>
    </main>
  );
};

export default Layout;
