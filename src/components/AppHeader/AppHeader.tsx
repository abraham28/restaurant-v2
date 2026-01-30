import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from 'atomic-components/Header';
import type { HeaderNavItem } from 'atomic-components/Header/types';
import { ROUTES, DEFAULT_APP_NAME } from 'utils/constants';

// Map routes to header app names
const routeAppNames: Record<string, string> = {
  [ROUTES.HOME]: DEFAULT_APP_NAME,
  [ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT]: 'CIS',
  [ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT]: 'CIS - Insert',
  [ROUTES.CLIENT_INFORMATION_SYSTEM.REVIEW]: 'CIS - Review',
  [ROUTES.CSV_UTILS.CSV_TO_JSON]: 'CSV to JSON',
};

// Function to get app name from path
function getAppNameFromPath(pathname: string): string {
  // Check exact match first
  if (routeAppNames[pathname]) {
    return routeAppNames[pathname];
  }

  // Check if pathname starts with any route
  for (const [route, appName] of Object.entries(routeAppNames)) {
    if (pathname.startsWith(route)) {
      return appName;
    }
  }

  // Default fallback
  return DEFAULT_APP_NAME;
}

function AppHeader() {
  const location = useLocation();

  // Get app name based on current route
  const appName = useMemo(
    () => getAppNameFromPath(location.pathname),
    [location.pathname],
  );

  // Navigation items - can be customized based on routes
  const navItems: HeaderNavItem[] = [
    {
      label: 'Client Information System',
      to: ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT,
      active: location.pathname.startsWith(
        ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT,
      ),
    },
  ];

  return <Header appName={appName} navItems={navItems} />;
}

export default AppHeader;
