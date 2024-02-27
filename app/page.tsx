import Link from 'next/link';
import { Routes } from '@/constants/endpoints';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const Home = async () => {
  const { userId } = auth();
  if (userId) {
    redirect(Routes.dashboard);
  }
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center px-5">
      <Image src="/logo.png" alt="logo" width={1280} height={720} />
      {userId ? (
        <Link href={Routes.dashboard}>Go to dashboard</Link>
      ) : (
        <Link href={Routes.signIn}>Create Accounts</Link>
      )}
    </div>
  );
};

export default Home;
