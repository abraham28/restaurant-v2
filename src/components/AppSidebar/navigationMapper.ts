import {
  Database,
  PiggyBank,
  Building2,
  FileText,
  BarChart3,
  Scale,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';
import { ROUTES } from 'utils/constants';
import type { NavGroup, NavItem } from './types';
import navigationData from './navigationData.json';

// Icon mapping from string names to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  Database,
  PiggyBank,
  Building2,
  FileText,
  BarChart3,
  Scale,
  ShieldCheck,
};

// Route mapping from string paths to actual route values
const routeMap: Record<string, string> = {
  'CLIENT_INFORMATION_SYSTEM.ROOT': ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT,
  'CLIENT_INFORMATION_SYSTEM.DASHBOARD':
    ROUTES.CLIENT_INFORMATION_SYSTEM.DASHBOARD,
  'CLIENT_INFORMATION_SYSTEM.INSERT': ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT,
  'CLIENT_INFORMATION_SYSTEM.REVIEW': ROUTES.CLIENT_INFORMATION_SYSTEM.REVIEW,
  // Add more routes as they are implemented
};

// Click handler mapping
const clickHandlerMap: Record<string, () => void> = {
  navigateToDeposits: () => {
    // TODO: Navigate to Deposits page
  },
  navigateToLoans: () => {
    // TODO: Navigate to Loans page
  },
  navigateToGL: () => {
    // TODO: Navigate to GL page
  },
  navigateToCISReports: () => {
    // TODO: Navigate to CIS Reports page
  },
  navigateToDepositsReports: () => {
    // TODO: Navigate to Deposits Reports page
  },
  navigateToLoansReports: () => {
    // TODO: Navigate to Loans Reports page
  },
  navigateToGLReports: () => {
    // TODO: Navigate to GL Reports page
  },
  navigateToDynamicQueryBuilder: () => {
    // TODO: Navigate to Dynamic Query Builder page
  },
  navigateToBSP: () => {
    // TODO: Navigate to BSP page
  },
  navigateToAMLC: () => {
    // TODO: Navigate to AMLC page
  },
  navigateToPDIC: () => {
    // TODO: Navigate to PDIC page
  },
  navigateToCIC: () => {
    // TODO: Navigate to CIC page
  },
};

// Type for JSON navigation item (before mapping)
interface JsonNavItem {
  id: string;
  labelKey: string;
  icon?: string;
  to?: string;
  onClick?: string;
}

// Type for JSON navigation group (before mapping)
interface JsonNavGroup {
  id: string;
  labelKey: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  items: JsonNavItem[];
}

/**
 * Maps JSON navigation data to NavGroup[] with proper icon components and routes
 */
export function mapNavigationData(): NavGroup[] {
  const jsonGroups = navigationData.navigationGroups as JsonNavGroup[];

  return jsonGroups.map((group) => ({
    id: group.id,
    labelKey: group.labelKey,
    collapsible: group.collapsible,
    defaultExpanded: group.defaultExpanded,
    items: group.items.map((item): NavItem => {
      const mappedItem: NavItem = {
        id: item.id,
        labelKey: item.labelKey,
      };

      // Map icon name to icon component
      if (item.icon && iconMap[item.icon]) {
        mappedItem.icon = iconMap[item.icon];
      }

      // Map route string to actual route path
      if (item.to && routeMap[item.to]) {
        mappedItem.to = routeMap[item.to];
      }

      // Map onClick handler name to actual function
      if (item.onClick && clickHandlerMap[item.onClick]) {
        mappedItem.onClick = clickHandlerMap[item.onClick];
      }

      return mappedItem;
    }),
  }));
}
