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
    <div className="flex w-screen h-screen flex-col items-center justify-center px-5 bg-white dark:bg-[#0d1117]">
      <Image src="/logo.png" alt="logo" width={1280} height={720} />
      {userId ? (
        <Link href={Routes.dashboard}>Go to dashboard</Link>
      ) : (
        <Link
          href={Routes.signIn}
          className="text-[24px] font-[600] mt-4 p-2 rounded-md dark:hover:bg-slate-900 duration-200 dark:bg-slate-950"
        >
          Join Now
        </Link>
      )}
    </div>
  );
};

export default Home;
