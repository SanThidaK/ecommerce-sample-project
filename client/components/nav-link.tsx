// components/NavLink.tsx
import Link from "next/link";

interface NavLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, className, children }) => {
  return (
    <Link
      href={href}
      className={`${className} relative inline-block text-gray-900 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full`}
    >
      {children}
    </Link>
  );
}

export const UnderlineNavLink = ({ href, className, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`${className} relative inline-block font-medium before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-white before:transition-colors before:duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:before:bg-transparent`}
    >
      {children}
    </Link>
  );
}

export default NavLink;