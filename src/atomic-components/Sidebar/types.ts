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
  /** User profile section (avatar, name) - optional */
  userProfile?: ReactNode;
  /** User actions (e.g. Settings, Logout) - always shown when provided, independent of profile */
  userActions?: ReactNode;
}
