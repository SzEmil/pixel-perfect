import Image from 'next/image';
import Link from 'next/link';

type NavigationItemProps = {
  link: {
    label: string;
    route: string;
    icon: string;
  };
  type: 'mobile' | 'desktop' | undefined;
  isActive: boolean;
};
export const NavigationItem = ({
  type,
  isActive,
  link,
}: NavigationItemProps) => {
  return (
    <div
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
    </div>
  );
};
