import { Header } from '@/components/shared/Header/Header';
import { Routes } from '@/constants/endpoints';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const { userId } = auth();
if(!userId) redirect(Routes.signIn)

  const user = await getUserById(userId);
  return (
    <>
      <Header
        title={`${user.username ?? 'Profile'}`}
        subtitle="Your safe space to connect and belong"
      />
    </>
  );
};

export default ProfilePage;
