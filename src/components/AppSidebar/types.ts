import { LucideIcon } from 'lucide-react';

export interface NavItem {
  /** Unique identifier for the navigation item */
  id: string;
  /** Translation key for the label */
  labelKey: string;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Optional route path for navigation */
  to?: string;
  /** Optional click handler (used when to is not provided) */
  onClick?: () => void;
}

export interface NavGroup {
  /** Unique identifier for the navigation group */
  id: string;
  /** Translation key for the group label */
  labelKey: string;
  /** Whether the group is collapsible */
  collapsible?: boolean;
  /** Whether the group is expanded by default */
  defaultExpanded?: boolean;
  /** Navigation items within this group */
  items: NavItem[];
}
