import { MobileNav } from '@/components/shared/MobileNav/MobileNav';
import { Sidebar } from '@/components/shared/Sidebar/Sidebar';

const Layout = async ({ children }: { children: React.ReactNode }) => {
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
