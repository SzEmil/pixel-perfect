import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { NavigationItem } from './NavigationItem';
import { User } from '@/lib/database/models/user.model';

type NavigationProps = {
  type?: 'mobile' | 'desktop';
  title: React.ReactNode;
  pathname: string;
  user: User;
  navLinks: {
    label: string;
    route: string;
    icon: any;
    disabled?: boolean;
  }[];
};

export const NavigationAccordion = ({
  type,
  navLinks,
  title,
  pathname,
  user,
}: NavigationProps) => {
  return (
    <Accordion collapsible type="single">
      <AccordionItem value="images">
        <AccordionTrigger className="ml-4 text-dark-700 dark:text-white font-[600] text-[16px] hover:text-green-500;">
          {title}
        </AccordionTrigger>
        <AccordionContent className="ml-2">
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
                  user={user}
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
