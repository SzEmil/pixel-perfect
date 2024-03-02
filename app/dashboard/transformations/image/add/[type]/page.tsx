import { Header } from '@/components/shared/Header/Header';
import { TransformationForm } from '@/components/shared/TransformationForm/TransformationForm';
import { transformationTypes } from '@/constants';
import { Routes } from '@/constants/endpoints';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// export async function generateStaticParams() {
//   return getImageTransformations();
// }

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const transformation = transformationTypes[type];
  const { userId } = auth();
  if(!userId) redirect(Routes.signIn)
  
  const user = await getCurrentUser(userId);

  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditbalance}
        />
      </section>
    </div>
  );
};

export default AddTransformationTypePage;
