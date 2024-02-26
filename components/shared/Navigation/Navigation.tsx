'use client';

import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { NavigationItem } from './NavigationItem';

type NavigationProps = {
  type?: 'mobile' | 'desktop';
  title: string,
  navLinks: {
    label: string;
    route: string;
    icon: string;
  }[];
};

export const Navigation = ({ type, navLinks,title }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <Accordion collapsible>
      <AccordionItem value="images">
        <AccordionTrigger className="text-dark-600 font-[600] text-[18px] hover:text-green-500;">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <ul
            className={`${
              type === 'desktop'
                ? 'sidebar-nav_elements'
                : 'header-nav_elements'
            }`}
          >
            {navLinks.map(link => {
              const isActive = link.route === pathname;

              return (
                <li key={link.route} className="w-full">
                  <NavigationItem type={type} link={link} isActive={isActive} />
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
