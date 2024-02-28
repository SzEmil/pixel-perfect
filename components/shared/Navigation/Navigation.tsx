'use client';

import { usePathname } from 'next/navigation';
import { NavigationAccordion } from './components/NavigationAccordion';
import { imageNavLinks, videoNavigationLinks, userNavLinks } from '@/constants';
import { NavigationItem } from './components/NavigationItem';
import { FaImage } from "react-icons/fa";
import { FaVideo } from 'react-icons/fa';
type NavigationProps = {
  type: 'desktop' | 'mobile';
};

export const Navigation = ({ type }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <div>
      <NavigationItem
        link={userNavLinks.home}
        isActive={userNavLinks.home.route === pathname}
        type={type}
        pathname={pathname}
      />
      <NavigationAccordion
        type={type}
        navLinks={imageNavLinks}
        title={
          <div className="flex gap-2 items-center">
            <FaImage size={24} /> Image Transformation
          </div>
        }
        pathname={pathname}
      />
      <NavigationAccordion
        type={type}
        navLinks={videoNavigationLinks}
        title={
          <div className="flex gap-2 items-center">
            <FaVideo size={24} /> Video Transformation
          </div>
        }
        pathname={pathname}
      />
      <div className="pt-1">
        <NavigationItem
          link={userNavLinks.profile}
          isActive={userNavLinks.profile.route === pathname}
          type={type}
          pathname={pathname}
        />
        <NavigationItem
          link={userNavLinks.credits}
          isActive={userNavLinks.credits.route === pathname}
          type={type}
          pathname={pathname}
        />
      </div>
    </div>
  );
};
