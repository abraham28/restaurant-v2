import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavListItemProps {
  /** The text label for the navigation item */
  label: string;
  /** Optional icon component from lucide-react */
  icon?: LucideIcon;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional href for Link component */
  to?: string;
  /** Whether this item is currently active */
  active?: boolean;
  /** Optional children (for nested content) */
  children?: ReactNode;
  /** Additional CSS class name */
  className?: string;
}
