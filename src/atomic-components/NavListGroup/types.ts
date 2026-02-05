import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavListGroupProps {
  /** The label/title for the group */
  label: string;
  /** The navigation items within this group */
  children: ReactNode;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Additional CSS class name */
  className?: string;
  /** Whether the group is collapsible */
  collapsible?: boolean;
  /** Whether the group is expanded by default (only applies if collapsible is true) */
  defaultExpanded?: boolean;
  /** Navigation destination URL - if provided, clicking the label will navigate */
  to?: string;
  /** Click handler for when the label is clicked */
  onClick?: () => void;
  /** Whether this navigation item is currently active */
  active?: boolean;
}
