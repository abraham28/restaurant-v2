import { ReactNode } from 'react';

export interface SidebarProps {
  /** Whether the sidebar is open */
  isOpen: boolean;
  /** Callback when sidebar should be closed */
  onClose: () => void;
  /** Callback when sidebar toggle button is clicked */
  onToggle: () => void;
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
