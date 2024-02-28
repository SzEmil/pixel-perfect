import Link from 'next/link';
import React from 'react';
import { getIcon } from '@/helpers/icons';

type NavigationItemProps = {
  pathname: string;
  link: {
    label: string;
    route: string;
    icon: any;
    disabled?: boolean;
  };
  type: 'mobile' | 'desktop' | undefined;
  isActive: boolean;
};
export const NavigationItem = ({
  type,
  isActive,
  link,
  pathname,
}: NavigationItemProps) => {
  return (
    <div
      className={`${
        link.disabled
          ? 'text-gray-300 dark:text-gray-700'
          : type === 'desktop'
          ? `sidebar-nav_element group dark:text-white ${
              isActive
                ? 'bg-gradient-to-r from-green-300 to-green-400 text-white'
                : 'text-gray-700'
            }`
          : type === 'mobile' &&
            `hover:text-green-400 text-dark-700 dark:text-white ${
              isActive && 'text-green-400'
            } p-18 flex whitespace-nowrap`
      }`}
    >
      <Link className="sidebar-link cursor-pointer" href={link.route}>
        <div
          className={`${
            isActive && `${type === 'desktop' ? 'brightness-200' : ''}`
          }`}
        >
          {React.createElement(getIcon(link.icon), { size: 24 })}
        </div>
        <p>{link.label}</p>
      </Link>
    </div>
  );
};
