import { LucideIcon } from 'lucide-react';

export interface IconButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'aria-label'
  > {
  /** The Lucide icon component to display */
  icon: LucideIcon;
  /** Size of the icon in pixels */
  size?: number;
  /** Accessible label for the button (required for accessibility) */
  'aria-label': string;
  /** Tooltip text (optional, defaults to aria-label) */
  title?: string;
}
