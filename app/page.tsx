import Link from 'next/link';
import { Routes } from '@/constants/endpoints';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const Home = async () => {
   const { userId } = auth();
  // if (userId) {
  //   redirect(Routes.dashboard);
  // }
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center px-5 bg-white dark:bg-[#0d1117]">
      <Image src="/logo.png" alt="logo" width={1280} height={720} />
      <p className="text-black dark:text-white font-[500] max-w-[600px] mt-2 text-[12px] sm:text-[16px] md:text-[18px]">
        AI powered platform to imporve your media.
      </p>
      <Image
        src="/assets/images/cloudinary.png"
        width={200}
        height={100}
        alt="cloudinary"
        className="h-[auto] fixed left-auto bottom-2"
      />
      {userId ? (
        <Link href={Routes.dashboard}>Go to dashboard</Link>
      ) : (
        <Link
          href={Routes.signIn}
          className="md:text-[24px] text-[14px] font-[600] mt-4 p-3 rounded-md dark:hover:bg-slate-900 duration-200 dark:bg-slate-950 border-solid border-2 border-white"
        >
          Join Now
        </Link>
      )}
    </div>
  );
};

export default Home;
