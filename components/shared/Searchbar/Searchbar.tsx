'use client';

import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const Searchbar = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState('');

  // const debouncedSearchProduct = debounce(query => {
  //   if (query) {
  //     const newSearchParams = new URLSearchParams(searchParams);
  //     newSearchParams.set('query', query);
  //     router.push(`${pathName}?${newSearchParams.toString()}`, {
  //       scroll: false,
  //     });
  //   } else {
  //     router.push(pathName, { scroll: false });
  //   }
  // }, 1000);

  useEffect(() => {
    debounce(() => {
      if (query) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('query', query);
        router.push(`${pathName}?${newSearchParams.toString()}`, {
          scroll: false,
        });
      } else {
        router.push(pathName, { scroll: false });
      }
    }, 1000)();
  }, [query]);

  return (
    <div className="search items-center">
      <FaSearch size={24} />

      <Input
        className="search-field"
        placeholder="Search for media"
        onChange={e => setQuery(e.target.value)}
        autoFocus={true}
      />
    </div>
  );
};
