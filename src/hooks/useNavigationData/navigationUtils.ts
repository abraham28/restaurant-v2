import type { NavItem, NavGroup } from './types';

/**
 * Checks if a navigation item matches the given pathname
 * Uses the item's `to` URL with startsWith matching for active state detection
 * @param item - The navigation item to check
 * @param pathname - The current route pathname
 * @returns True if the item matches the pathname, false otherwise
 */
function itemMatchesPathname(item: NavItem, pathname: string): boolean {
  // Use startsWith to match the route and any sub-routes
  // This allows /client-information-system to match /client-information-system/dashboard, etc.
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

/**
 * Recursively checks if any nested item in a navigation item matches the current pathname
 * Used to determine if a nested group should be expanded by default
 * @param item - The navigation item to check
 * @param pathname - The current route pathname
 * @returns True if any nested item matches the pathname, false otherwise
 */
export function itemHasActiveChild(item: NavItem, pathname: string): boolean {
  if (!item.items || item.items.length === 0) {
    return false;
  }

  return item.items.some(
    (subItem) =>
      itemMatchesPathname(subItem, pathname) ||
      itemHasActiveChild(subItem, pathname),
  );
}

/**
 * Checks if a navigation item is active (matches pathname) or has an active child
 * Used to determine if a collapsible item should be expanded by default
 * @param item - The navigation item to check
 * @param pathname - The current route pathname
 * @returns True if the item itself is active or has an active child, false otherwise
 */
export function itemIsActiveOrHasActiveChild(
  item: NavItem,
  pathname: string,
): boolean {
  // Check if the item itself is active
  if (itemMatchesPathname(item, pathname)) {
    return true;
  }

  // Check if any child is active
  return itemHasActiveChild(item, pathname);
}

/**
 * Recursively collects all items with routes from navigation items
 */
function collectItemsWithRoutes(
  items: NavItem[],
  result: Array<{ item: NavItem; routeLength: number }>,
): void {
  for (const item of items) {
    // Use route length for priority - longer routes are more specific
    result.push({ item, routeLength: item.to.length });
    // Recursively collect from nested items
    if (item.items && item.items.length > 0) {
      collectItemsWithRoutes(item.items, result);
    }
  }
}

export function getActiveNavIdFromPath(
  pathname: string,
  navigationGroups: NavGroup[],
): string | null {
  // Collect all items with routes, sorted by route length (longest first) for more specific matches
  const itemsWithRoutes: Array<{ item: NavItem; routeLength: number }> = [];

  for (const group of navigationGroups) {
    collectItemsWithRoutes(group.items, itemsWithRoutes);
  }

  // Sort by route length (longest first) to match more specific routes first
  itemsWithRoutes.sort((a, b) => b.routeLength - a.routeLength);

  // Try to match pathname against each item
  for (const { item } of itemsWithRoutes) {
    if (itemMatchesPathname(item, pathname)) {
      return item.id;
    }
  }

  return null;
}

/**
 * Checks if any item in a navigation group matches the current pathname
 * Used to determine if a group should be expanded by default
 * @param group - The navigation group to check
 * @param pathname - The current route pathname
 * @returns True if any item in the group matches the pathname, false otherwise
 */
export function groupHasActiveItem(group: NavGroup, pathname: string): boolean {
  return group.items.some(
    (item) =>
      itemMatchesPathname(item, pathname) || itemHasActiveChild(item, pathname),
  );
}
