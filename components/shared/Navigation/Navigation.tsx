'use client';
import { navLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type NavigationProps = {
  type?: 'mobile' | 'desktop';
};

export const Navigation = ({ type }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <ul
      className={`${
        type === 'desktop' ? 'sidebar-nav_elements' : 'header-nav_elements'
      }`}
    >
      {navLinks.map(link => {
        const isActive = link.route === pathname;

        return (
          <li
            key={link.route}
            className={`${
              type === 'desktop'
                ? `sidebar-nav_element group ${
                    isActive
                      ? 'bg-gradient-to-r from-green-300 to-green-400 text-white'
                      : 'text-gray-700'
                  }`
                : type === 'mobile' &&
                  `hover:text-green-400 text-dark-700 ${
                    isActive && 'text-green-400'
                  } p-18 flex whitespace-nowrap`
            }`}
          >
            <Link className="sidebar-link cursor-pointer" href={link.route}>
              <Image
                src={link.icon}
                alt="logo"
                width={24}
                height={24}
                className={`${
                  isActive && `${type === 'desktop' ? 'brightness-200' : ''}`
                }`}
              />
              <p>{link.label}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
