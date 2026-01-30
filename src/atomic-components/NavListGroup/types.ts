import { ReactNode } from 'react';

export interface NavListGroupProps {
  /** The label/title for the group */
  label: string;
  /** The navigation items within this group */
  children: ReactNode;
  /** Additional CSS class name */
  className?: string;
}
