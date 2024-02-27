import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { NavigationItem } from './NavigationItem';
import { IconType } from 'react-icons/lib';

type NavigationProps = {
  type?: 'mobile' | 'desktop';
  title: string;
  pathname: string;
  navLinks: {
    label: string;
    route: string;
    icon: IconType;
    disabled?: boolean;
  }[];
};

export const NavigationAccordion = ({
  type,
  navLinks,
  title,
  pathname,
}: NavigationProps) => {
  return (
    <Accordion collapsible type="single">
      <AccordionItem value="images">
        <AccordionTrigger className="text-dark-600 font-[600] text-[18px] hover:text-green-500;">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <ul
            className={
              type === 'desktop'
                ? 'sidebar-nav_elements'
                : 'header-nav_elements'
            }
          >
            {navLinks.map(link => (
              <li
                key={link.route}
                className={`w-full ${
                  link.disabled && 'pointer-events-none text-gray-600'
                }`}
              >
                <NavigationItem
                  type={type}
                  link={link}
                  isActive={pathname === link.route}
                  pathname={pathname}
                />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
