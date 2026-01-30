import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface HeaderNavItem {
  /** The text label for the nav item */
  label: string;
  /** The route path */
  to: string;
  /** Whether this nav item is currently active */
  active?: boolean;
}

export interface HeaderDropdownItem {
  /** The text label */
  label: string;
  /** Optional icon component from lucide-react */
  icon?: LucideIcon;
  /** Click handler */
  onClick: () => void;
  /** Whether this item is active/selected */
  active?: boolean;
  /** Optional badge text (e.g., "Owner") */
  badge?: string;
  /** Optional checkmark indicator */
  showCheck?: boolean;
}

export interface HeaderDropdownSection {
  /** Section label */
  label: string;
  /** Items in this section */
  items: HeaderDropdownItem[];
}

export interface HeaderProps {
  /** App/brand name */
  appName: string;
  /** Navigation items */
  navItems?: HeaderNavItem[];
  /** Profile button content (initials or icon) - if not provided, profile section won't render */
  profileContent?: ReactNode;
  /** Profile button title/tooltip */
  profileTitle?: string;
  /** Whether dropdown is open - only used if profileContent is provided */
  isDropdownOpen?: boolean;
  /** Callback when profile button is clicked - only used if profileContent is provided */
  onProfileClick?: () => void;
  /** Dropdown header content (user name, email, etc.) */
  dropdownHeader?: ReactNode;
  /** Dropdown items */
  dropdownItems?: HeaderDropdownItem[];
  /** Dropdown sections (for grouped items) */
  dropdownSections?: HeaderDropdownSection[];
  /** Additional CSS class name */
  className?: string;
}
