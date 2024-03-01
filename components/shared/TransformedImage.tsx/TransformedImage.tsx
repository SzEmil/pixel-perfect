'use client';

import { dataUrl, download, getImageSize } from '@/lib/utils';
import { debounce } from 'lodash';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa6';

declare type TransformedImageProps = {
  image: any;
  type: string;
  title: string;
  transformationConfig: Transformations | null;
  isTransforming: boolean;
  hasDownload?: boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TransformedImage = ({
  image,
  title,
  type,
  transformationConfig,
  isTransforming,
  hasDownload = false,
  setIsTransforming,
}: TransformedImageProps) => {
  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(),
      download(
        getCldImageUrl({
          width: image?.width,
          height: image?.height,
          src: image?.publicId,
          ...transformationConfig,
        }),
        title
      );
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600 dark:text-white">Transformed</h3>
        {hasDownload && (
          <button className="download-btn hover:text-green-500 transition-all" onClick={downloadHandler}>
            <FaDownload
              size={24}
            />
          </button>
        )}
      </div>
      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, 'width')}
            height={getImageSize(type, image, 'height')}
            src={image?.publicId}
            alt={image.title ?? 'transformed image'}
            sizes={'(max-width: 756px) 100vw, 50vw'}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000);
            }}
            {...transformationConfig}
          />
          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="transforming"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Your New Image</div>
      )}
    </div>
  );
};
