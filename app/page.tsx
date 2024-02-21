import Link from 'next/link';
import { Routes } from '@/constants/endpoints';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Home = async () => {
  const { userId } = auth();
  if (userId) {
    redirect(Routes.dashboard);
  }
  return (
    <div>
      <p>Home</p>
      {userId ? (
        <Link href={Routes.dashboard}>Go to dashboard</Link>
      ) : (
        <Link href={Routes.signIn}>Create Accounts</Link>
      )}
    </div>
  );
};

export default Home;
