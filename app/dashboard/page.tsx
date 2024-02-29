import { UserButton } from '@clerk/nextjs';
import { imageNavLinks, videoNavigationLinks } from '@/constants';
import { getIcon } from '@/helpers/icons';
import React from 'react';
import Link from 'next/link';
import { Collection } from '@/components/shared/Collection/Collection';
import { getAllImages } from '@/lib/actions/image.actions';

const DashboardPage = async ({ searchParams }: SearchParamProps) => {
  const page = +(searchParams?.page ?? 1);
  const searchQuery = (searchParams?.query as string) ?? '';
  const images = await getAllImages({ page, searchQuery });
  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          For media that are perfect, down to the last pixel.
        </h1>
        <ul className="flex items-center justify-between w-full gap-20 mt-3">
          {imageNavLinks.map(item => (
            <li key={item.label} className="text-white">
              <Link href={item.route} className="flex flex-col items-center">
                {React.createElement(getIcon(item.icon as any), { size: 32 })}
                <p className="inline text-center font-[500]">{item.label}</p>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center justify-between w-full gap-20 mt-3">
          {videoNavigationLinks.map(item => (
            <li
              key={item.label}
              className={`${
                item.disabled
                  ? 'text-gray-300 pointer-events-none'
                  : 'text-white'
              }`}
            >
              <Link href={item.route} className="flex flex-col items-center">
                {React.createElement(getIcon(item.icon as any), { size: 32 })}
                <p className="inline text-center font-[500]">{item.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          page={page.toString()}
          images={images?.data ?? []}
          hasSearch={true}
          totalPages={images?.totalPage}
        />
      </section>
    </>
  );
};

export default DashboardPage;
