'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './styles.module.scss';

const NAV_ITEMS = [
  { href: '/', label: 'My Trips' },
  { href: '/statistics', label: 'Statistics' },
];

interface NavItemProps {
  href: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, currentPath, children }) => (
  <li className={`${styles.menuItem} ${currentPath === href ? styles.current : ''}`}>
    <Link href={href}>{children}</Link>
  </li>
);

const NavLinks: React.FC = () => {
  const pathname = usePathname();

  return (
    <ul className={styles.menu}>
      {NAV_ITEMS.map(item => (
        <NavItem key={item.href} href={item.href} currentPath={pathname}>{item.label}</NavItem>
      ))}
    </ul>
  );
};

export default NavLinks;
