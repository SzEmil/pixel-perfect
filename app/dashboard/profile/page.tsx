import { Collection } from '@/components/shared/Collection/Collection';
import { Header } from '@/components/shared/Header/Header';
import { Routes } from '@/constants/endpoints';
import { getUserImages } from '@/lib/actions/image.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { GiTwoCoins } from 'react-icons/gi';
import { IoMdImages } from 'react-icons/io';

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect(Routes.signIn);

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header
        title={`${user.username ?? 'Profile'}`}
        subtitle="Your safe space to connect and belong"
      />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium md:p-16-medium text-dark-700 ">
            CREDITS AVAILABLE
          </p>
          <div className="mt-4 flex items-center gap-4 text-yellow-400">
            <GiTwoCoins size={50} />
            <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium md:p-16-medium text-dark-700">
            Pixels Count
          </p>
          <div className="mt-4 flex items-center gap-4 text-blue-300 ">
            <IoMdImages size={50} />
            <h2 className="h2-bold text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page.toString()}
          title="Your Pixels"
        />
      </section>
    </>
  );
};

export default ProfilePage;
