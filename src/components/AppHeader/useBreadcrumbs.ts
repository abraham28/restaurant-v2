import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'utils/constants';
import {
  useNavigationData,
  getActiveNavIdFromPath,
} from 'hooks/useNavigationData';
import type { BreadcrumbItem } from 'atomic-components/Breadcrumbs/types';
import type { NavItem, NavGroup } from 'hooks/useNavigationData';

// Map route segments to translation keys
const routeSegmentKeys: Record<string, string> = {
  'client-information-system': 'clientInformationSystem',
  new: 'add',
  review: 'clientInformationSystemReview',
  csvutils: 'csvToJson',
  csvtojson: 'csvToJson',
};

/**
 * Recursively finds a navigation item that matches the given pathname
 */
function findNavItemByPathname(
  items: NavItem[],
  pathname: string,
): NavItem | null {
  for (const item of items) {
    // Check if this item matches exactly
    if (pathname === item.to) {
      return item;
    }
    // Recursively check nested items
    if (item.items && item.items.length > 0) {
      const nestedItem = findNavItemByPathname(item.items, pathname);
      if (nestedItem) {
        return nestedItem;
      }
    }
  }
  return null;
}

/**
 * Checks if a pathname exists in the navigation data
 */
function isRouteValid(groups: NavGroup[], pathname: string): boolean {
  return getActiveNavIdFromPath(pathname, groups) !== null;
}

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const { t } = useTranslation();
  const { navigationGroups } = useNavigationData();

  return useMemo<BreadcrumbItem[]>(() => {
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);

    // If we're on the home page, return app name
    if (pathname === ROUTES.HOME || segments.length === 0) {
      return [
        {
          title: t('appName'),
          href: ROUTES.HOME,
        },
      ];
    }

    // Check if the current pathname is a valid route using navigation data
    const isValidRoute = isRouteValid(navigationGroups, pathname);

    // If route is not valid, show Page Not Found
    if (!isValidRoute) {
      return [
        {
          title: t('appName'),
          href: ROUTES.HOME,
        },
        {
          title: t('pageNotFound'),
          href: pathname,
        },
      ];
    }

    // Try to find matching nav item to use its label
    const allNavItems = navigationGroups.flatMap((group) => group.items);
    const matchingNavItem = findNavItemByPathname(allNavItems, pathname);

    const items: BreadcrumbItem[] = [];
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Priority 1: Check routeSegmentKeys first
      let title: string;
      const translationKey = routeSegmentKeys[segment.toLowerCase()];
      if (translationKey) {
        title = t(translationKey);
      } else if (
        // Priority 2: If no routeSegmentKeys match, try nav item label
        matchingNavItem &&
        matchingNavItem.to === currentPath &&
        index === segments.length - 1
      ) {
        title = matchingNavItem.label;
      } else {
        // Fallback: capitalize and replace hyphens with spaces
        title =
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      }

      items.push({
        title,
        href: currentPath,
      });
    });

    return items;
  }, [location.pathname, t, navigationGroups]);
};
