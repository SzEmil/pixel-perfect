import { Header } from '@/components/shared/Header/Header';
import { TransformationForm } from '@/components/shared/TransformationForm/TransformationForm';
import { transformationTypes } from '@/constants';
import { Routes } from '@/constants/endpoints';
import { getImageById } from '@/lib/actions/image.actions';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { Image } from '@/lib/database/models/image.model';
import { User } from '@/lib/database/models/user.model';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

type UpdateImagePageProps = {
  params: { id: string };
};

const UpdateImagePage = async ({ params: { id } }: UpdateImagePageProps) => {
  const { userId } = auth();
  if (!userId) redirect(Routes.home);

  const user: User = await getCurrentUser(userId);
  const image = await getImageById(id);
  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];
  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance ?? 0}
          config={image.config}
          data={image}
        />
      </section>
    </div>
  );
};

export default UpdateImagePage;
