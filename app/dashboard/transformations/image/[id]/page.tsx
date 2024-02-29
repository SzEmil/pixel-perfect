import { EditImage } from '@/components/shared/EditImage/EditImage';
import { Header } from '@/components/shared/Header/Header';
import { TransformedImage } from '@/components/shared/TransformedImage.tsx/TransformedImage';
import { getImageById } from '@/lib/actions/image.actions';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { getImageSize } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import Image from 'next/image';

type TransformationsPageProps = {
  params: { id: string };
};

const TransformationsPage = async ({
  params: { id },
}: TransformationsPageProps) => {
  const image = await getImageById(id);
  //const user = await getCurrentUser();
  // console.log(image);
  // const image = {
  //   _id: '65e0b5bbdd9b20fc113ec790',
  //   title: 'Turtle in Ocean - Generative Fill ',
  //   transformationType: 'fill',
  //   publicId: 'pixel-perfect/bsvgqgdeugd5szhluun1',
  //   secureURL:
  //     'https://res.cloudinary.com/dyxu81hcz/image/upload/v1709225325/pixel-perfect/bsvgqgdeugd5szhluun1.jpg',
  //   width: 1000,
  //   height: 1778,
  //   config: { fillBackground: true },
  //   transformationURL:
  //     'https://res.cloudinary.com/dyxu81hcz/image/upload/c_limit,w_1000/b_gen_fill,ar_1000:1778,w_1000,c_pad/f_auto/q_auto/v1/pixel-perfect/bsvgqgdeugd5szhluun1?_a=BAVAfVBy0',
  //   aspectRatio: '9:16',
  //   color: '',
  //   prompt: '',
  //   author: {
  //     _id: '65e0ae3cfcdb8099140393d3',
  //     firstName: 'Emil',
  //     lastName: 'Szymczyk',
  //   },
  //   createdAt: '2024-02-29T16:50:03.145Z',
  //   updatedAt: '2024-02-29T16:50:03.145Z',
  //   __v: 0,
  // };
  return (
    <>
      <Header title={image.title} />
      <div className="mt-7 text-dark-600 dark:text-white w-full">
        <div className="flex text-[14px] gap-3 mt-2">
          <li className="flex gap-1 items-center">
            <p>Transformation Type:</p>
            <p className="text-green-500">{image.transformationType}</p>
          </li>
          <li className="flex gap-1 items-center">
            <p>Dimensions:</p>
            <p className="text-green-500">{`${image.width}x${image.height}px`}</p>
          </li>
          {image?.aspectRatio && (
            <li className="flex gap-1 items-center">
              <p>Aspect Ratio:</p>
              <p className="text-green-500">{image.aspectRatio}</p>
            </li>
          )}
          {image?.color && (
            <li className="flex gap-1 items-center">
              <p>Color:</p>
              <p className="text-green-500">{image.aspectRatio}</p>
            </li>
          )}
          {image?.prompt && (
            <li className="flex gap-1 items-center">
              <p>Prompt:</p>
              <p className="text-green-500">{image.prompt}</p>
            </li>
          )}
        </div>
      </div>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600 dark:text-white">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, 'width')}
              height={getImageSize(image.transformationType, image, 'height')}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        <EditImage
          authorId={image.author._id}
          imageId={image._id}
         // userId={user._id}
        />
      </section>
    </>
  );
};

export default TransformationsPage;
