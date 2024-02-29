import { transformationTypes } from '@/constants';
import { Routes } from '@/constants/endpoints';
import { getIcon } from '@/helpers/icons';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type CollectionCardProps = {
  image: CloudinaryImage;
};

export const CollectionCard = ({ image }: CollectionCardProps) => {
  return (
    <li>
      <Link
        href={`${Routes.transformationsImage}/${image._id}`}
        className="collection-card"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover"
          sizes="(max-width: 756px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex items-center gap-2 dark-text-dark-600">
          <div className='w-[24px] h-[24px] dark:text-dark-600'>
            {React.createElement(
              getIcon(
                transformationTypes[
                  image.transformationType as TransformationTypeKey
                ].icon
              ),
              { size: 24 }
            )}
          </div>
          <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
            {image.title}
          </p>
        </div>
      </Link>
    </li>
  );
};
