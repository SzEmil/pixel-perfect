import { EditMedia } from '@/components/shared/EditMedia/EditMedia';
import { Header } from '@/components/shared/Header/Header';
import { TransformedImage } from '@/components/shared/TransformedImage.tsx/TransformedImage';
import { getImageById } from '@/lib/actions/image.actions';
import { getImageSize } from '@/lib/utils';
import Image from 'next/image';

type TransformationsPageProps = {
  params: { id: string };
};

const TransformationsPage = async ({
  params: { id },
}: TransformationsPageProps) => {
  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />
      <div className="mt-7 text-dark-600 dark:text-white w-full">
        <div className="flex text-[14px] gap-3 mt-2">
          <li className="flex gap-3 items-center">
            <div className="flex gap-1 items-center">
              <p>Transformation Type:</p>
              <p className="text-green-500">{image.transformationType}</p>
            </div>
            <p>✦</p>
          </li>
          <li className="flex gap-3 items-center">
            <div className="flex gap-1 items-center">
              <p>Dimensions:</p>
              <p className="text-green-500">{`${image.width}x${image.height}px`}</p>
            </div>
          </li>
          {image?.aspectRatio && (
            <li className="flex gap-3 items-center">
              <p>✦</p>
              <div className="flex gap-1 items-center">
                <p>Aspect Ratio:</p>
                <p className="text-green-500">{image.aspectRatio}</p>
              </div>
            </li>
          )}
          {image?.color && (
            <li className="flex gap-3 items-center">
              <p>✦</p>
              <div className="flex gap-1 items-center">
                <p>Color:</p>
                <p className="text-green-500">{image.color}</p>
              </div>
            </li>
          )}
          {image?.prompt && (
            <li className="flex gap-1 items-center">
              <p>✦</p>
              <div className="flex gap-1 items-center">
                <p>Prompt:</p>
                <p className="text-green-500">{image.prompt}</p>
              </div>
            </li>
          )}
          {image?.from && (
            <li className="flex gap-1 items-center">
              <p>✦</p>
              <div className="flex gap-1 items-center">
                <p>From:</p>
                <p className="text-green-500">{image.from}</p>
              </div>
            </li>
          )}
          {image?.to && (
            <li className="flex gap-1 items-center">
              <p>✦</p>
              <div className="flex gap-1 items-center">
                <p>To:</p>
                <p className="text-green-500">{image.to}</p>
              </div>
            </li>
          )}
        </div>
      </div>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
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

        <EditMedia
          authorId={image.author}
          mediaId={image._id}
          mediaName={image.title}
        />
      </section>
    </>
  );
};

export default TransformationsPage;
