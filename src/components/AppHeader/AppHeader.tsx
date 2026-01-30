import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from 'atomic-components/Header';
import type { HeaderNavItem } from 'atomic-components/Header/types';
import { ROUTES } from 'utils/constants';

// Map routes to translation keys for header app names
const routeAppNameKeys: Record<string, string> = {
  [ROUTES.HOME]: 'restaurant',
  [ROUTES.SAMPLE.ROOT]: 'sample',
  [ROUTES.SAMPLE.CREATE]: 'sampleCreate',
  [ROUTES.SAMPLE.EDIT]: 'sampleEdit',
  [ROUTES.CSV_UTILS.CSV_TO_JSON]: 'csvToJson',
};

function AppHeader() {
  const location = useLocation();
  const { t } = useTranslation();

  // Get app name based on current route
  const appName = useMemo(() => {
    // Function to get app name from path
    const getAppNameFromPath = (pathname: string): string => {
      // Check exact match first
      if (routeAppNameKeys[pathname]) {
        return t(routeAppNameKeys[pathname]);
      }

      // Check if pathname starts with any route
      for (const [route, key] of Object.entries(routeAppNameKeys)) {
        if (pathname.startsWith(route)) {
          return t(key);
        }
      }

      // Default fallback
      return t('restaurant');
    };

    return getAppNameFromPath(location.pathname);
  }, [location.pathname, t]);

  // Navigation items - can be customized based on routes
  const navItems: HeaderNavItem[] = [
    {
      label: t('sample'),
      to: ROUTES.SAMPLE.ROOT,
      active: location.pathname.startsWith(ROUTES.SAMPLE.ROOT),
    },
  ];

  return <Header appName={appName} navItems={navItems} />;
}

export default AppHeader;
