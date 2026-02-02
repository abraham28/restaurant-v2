import { ReactNode } from 'react';

export interface NavListGroupProps {
  /** The label/title for the group */
  label: string;
  /** The navigation items within this group */
  children: ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Whether the group is collapsible */
  collapsible?: boolean;
  /** Whether the group is expanded by default (only applies if collapsible is true) */
  defaultExpanded?: boolean;
}
