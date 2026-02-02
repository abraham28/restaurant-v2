import { ReactNode } from 'react';

export interface SidebarProps {
  /** Logo image source */
  logo?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Sidebar title/brand name */
  title: string;
  /** Navigation content (NavListItem, NavListGroup components) */
  children: ReactNode;
  /** Additional CSS class name */
  className?: string;
}
