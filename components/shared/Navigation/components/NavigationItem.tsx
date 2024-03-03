import Link from 'next/link';
import React from 'react';
import { getIcon } from '@/helpers/icons';
import { User } from '@/lib/database/models/user.model';

type NavigationItemProps = {
  pathname: string;
  link: {
    label: string;
    route: string;
    icon: any;
    disabled?: boolean;
    pro?: boolean;
  };
  type: 'mobile' | 'desktop' | undefined;
  isActive: boolean;
  user: User;
};
export const NavigationItem = ({
  type,
  isActive,
  link,
  user,
  pathname,
}: NavigationItemProps) => {
  return (
    <div
      className={`${
        user.planId === 1 && link.pro
          ? 'pointer-events-none text-gray-300 dark:text-gray-700'
          : link.disabled
          ? 'text-gray-300 dark:text-gray-700'
          : type === 'desktop'
          ? `sidebar-nav_element group dark:text-white ${
              isActive
                ? 'bg-gradient-to-r from-green-300 to-green-500 text-white'
                : 'text-gray-700'
            }`
          : type === 'mobile' &&
            `hover:text-green-400 text-dark-700 dark:text-white ${
              isActive && 'text-green-500'
            } p-18 flex whitespace-nowrap`
      }`}
    >
      <Link className="sidebar-link cursor-pointer relative" href={link.route}>
        <div
          className={`${
            isActive && `${type === 'desktop' ? 'brightness-200' : ''}`
          }`}
        >
          {React.createElement(getIcon(link.icon), { size: 24 })}
        </div>
        <p>{link.label}</p>
        {link.pro && user.planId === 1 && (
          <div className="absolute right-0 top-0  text-green-500">
            <p className="border-solid p-2 border-white ">pro</p>
          </div>
        )}
      </Link>
    </div>
  );
};
