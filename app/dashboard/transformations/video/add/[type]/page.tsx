import { Routes } from '@/constants/endpoints';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationType = async () => {
  const { userId } = auth();
  if (!userId) redirect(Routes.signIn);
  return <div>transformation video</div>;
};

export default AddTransformationType;
