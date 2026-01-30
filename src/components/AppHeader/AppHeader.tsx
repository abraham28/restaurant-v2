import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from 'atomic-components/Header';
import type { HeaderNavItem } from 'atomic-components/Header/types';
import { ROUTES } from 'utils/constants';

function AppHeader() {
  const location = useLocation();

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

  return <Header appName="Core Banking" navItems={navItems} />;
}

export default AppHeader;
