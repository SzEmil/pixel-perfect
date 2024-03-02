import { MobileNav } from '@/components/shared/MobileNav/MobileNav';
import { Sidebar } from '@/components/shared/Sidebar/Sidebar';
import { Routes } from '@/constants/endpoints';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // const { userId } = auth();
  // if (userId) {
  //   redirect(Routes.home);
  // }
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <div className="wrapper"> {children}</div>
      </div>
    </main>
  );
};

export default Layout;
