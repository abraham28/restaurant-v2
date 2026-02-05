import { LucideIcon } from 'lucide-react';

export interface NavItem {
  /** Unique identifier for the navigation item */
  id: string;
  /** Translated label text */
  label: string;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Route path for navigation */
  to: string;
  /** Optional nested navigation items */
  items?: NavItem[];
}

export interface NavGroup {
  /** Unique identifier for the navigation group */
  id: string;
  /** Translated label text */
  label: string;
  /** Navigation items within this group */
  items: NavItem[];
}
