'use client';
import React from 'react';
import {
  Pagination as PagiantionChcn,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  totalPages: number;
  page: string;
};
export const Pagination = ({ totalPages, page }: PaginationProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onPageChange = (action: string) => {
    const pageValue = action === 'next' ? Number(page) + 1 : Number(page) - 1;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', pageValue.toString());
    router.push(`${pathName}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };
  return (
    totalPages > 1 && (
      <PagiantionChcn className="mt-10">
        <PaginationContent className="flex w-full">
          <Button
            disabled={Number(page) <= 1}
            className="collection-btn"
            onClick={() => onPageChange('prev')}
          >
            <PaginationPrevious className="hover:bg-transparent hover:text-white" />
          </Button>

          <p className="flex-center p-16-medium w-fit flex-1">
            {page} / {totalPages}
          </p>

          <Button
            className="button w-32 from-green-300 to-green-500 bg-cover text-white"
            onClick={() => onPageChange('next')}
            disabled={Number(page) >= totalPages}
          >
            <PaginationNext className="hover:bg-transparent hover:text-white" />
          </Button>
        </PaginationContent>
      </PagiantionChcn>
    )
  );
};
