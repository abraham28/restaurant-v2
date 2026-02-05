import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from 'atomic-components/Sidebar';
import NavListItem from 'atomic-components/NavListItem';
import NavListGroup from 'atomic-components/NavListGroup';
import { ROUTES } from 'utils/constants';
import type { NavItem } from './types';
import { mapNavigationData } from './navigationMapper';
import CustomerDetailsModal from './CIS/CustomerDetails';
import UserProfile from './UserProfile';
import UserActions from './UserActions';
import AccountsModal from './CIS/Accounts';
import SettingsModal from './CIS/Settings';
import AuditLogModal from './CIS/AuditLog';
import AssessmentModal from './CIS/Assessment';
import UserSettingsModal from './UserSettings';
import LogoutModal from './UserLogOut';

// Map routes to navigation IDs (similar to routeTitleKeys in PageTitle.tsx)
const routeNavIdMap: Record<string, string> = {
  // Client Information System routes
  [ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT]: 'core-modules-cis',
  [ROUTES.CLIENT_INFORMATION_SYSTEM.DASHBOARD]: 'core-modules-cis',
  [ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT]: 'core-modules-cis',
  [ROUTES.CLIENT_INFORMATION_SYSTEM.REVIEW]: 'core-modules-cis',
  '/client-information-system/individual': 'core-modules-cis',
  '/client-information-system/individual/insert': 'core-modules-cis',
  '/client-information-system/company': 'core-modules-cis',
  '/client-information-system/company/insert': 'core-modules-cis',
  '/client-information-system/government': 'core-modules-cis',
  '/client-information-system/government/insert': 'core-modules-cis',
  '/client-information-system/organization': 'core-modules-cis',
  '/client-information-system/organization/insert': 'core-modules-cis',

  // Add more route mappings as routes are implemented
  // Deposits routes (when implemented)
  // [ROUTES.DEPOSITS?.ROOT]: 'core-modules-deposits',
  // [ROUTES.DEPOSITS?.DASHBOARD]: 'core-modules-deposits',
  // [ROUTES.DEPOSITS?.INSERT]: 'core-modules-deposits',

  // Loans routes (when implemented)
  // [ROUTES.LOANS?.ROOT]: 'core-modules-loans',
  // [ROUTES.LOANS?.DASHBOARD]: 'core-modules-loans',
  // [ROUTES.LOANS?.INSERT]: 'core-modules-loans',

  // GL routes (when implemented)
  // [ROUTES.GL?.ROOT]: 'core-modules-gl',
  // [ROUTES.GL?.DASHBOARD]: 'core-modules-gl',

  // Report routes (when implemented)
  // [ROUTES.REPORTS?.CIS]: 'report-cis',
  // [ROUTES.REPORTS?.DEPOSITS]: 'report-deposits',
  // [ROUTES.REPORTS?.LOANS]: 'report-loans',
  // [ROUTES.REPORTS?.GL]: 'report-gl',
  // [ROUTES.REPORTS?.DYNAMIC_QUERY]: 'report-dynamic-query',

  // Regulatory routes (when implemented)
  // [ROUTES.REGULATORY?.BSP]: 'regulatory-bsp',
  // [ROUTES.REGULATORY?.AMLC]: 'regulatory-amlc',
  // [ROUTES.REGULATORY?.PDIC]: 'regulatory-pdic',
  // [ROUTES.REGULATORY?.CIC]: 'regulatory-cic',
};

/**
 * Gets the active navigation ID from the current pathname
 * Similar to getTitleFromPath in PageTitle.tsx
 * @param pathname - The current route pathname
 * @returns The navigation ID if a match is found, null otherwise
 */
function getActiveNavIdFromPath(pathname: string): string | null {
  // Check exact match first
  if (routeNavIdMap[pathname]) {
    return routeNavIdMap[pathname];
  }

  // Check if pathname starts with any route in the map
  // Sort routes by length (longest first) to match more specific routes first
  const sortedRoutes = Object.entries(routeNavIdMap).sort(
    ([routeA], [routeB]) => routeB.length - routeA.length,
  );

  for (const [route, navId] of sortedRoutes) {
    // Ensure we match complete path segments (e.g., '/client' shouldn't match '/client-information-system')
    // Match if pathname starts with route followed by '/' or if it's an exact match
    if (pathname.startsWith(route + '/') || pathname === route) {
      return navId;
    }
  }

  return null;
}

function AppSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  // Map navigation data from JSON file
  const navigationGroups = useMemo(() => mapNavigationData(), []);

  const [activeNavId, setActiveNavId] = useState<string | null>(null);

  // Automatically set active nav ID from current route (similar to PageTitle.tsx)
  useEffect(() => {
    const navId = getActiveNavIdFromPath(location.pathname);
    setActiveNavId(navId);
  }, [location.pathname]);

  /**
   * Handles navigation item clicks consistently
   * Sets the active nav ID and executes the item's onClick handler if provided
   * @param item - The navigation item that was clicked
   */
  const handleNavItemClick = useCallback((item: NavItem) => {
    setActiveNavId(item.id);
    if (item.onClick) {
      item.onClick();
    }
  }, []);
  const [showCustomerDetailsModal, setShowCustomerDetailsModal] =
    useState(false);
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAuditLogModal, setShowAuditLogModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <Sidebar
        logo="/android-chrome-192x192.png"
        logoAlt={t('appNameLogo')}
        title={t('appName')}
        userProfile={<UserProfile userName="John Doer" userPhotoUrl={null} />}
        userActions={
          <UserActions
            onSettingsClick={() => setShowUserSettingsModal(true)}
            onLogoutClick={() => setShowLogoutModal(true)}
          />
        }
      >
        {/* Render navigation groups and items from navigationGroups array */}
        {navigationGroups.map((group) => (
          <NavListGroup
            key={group.id}
            label={t(group.labelKey)}
            collapsible={group.collapsible}
            defaultExpanded={group.defaultExpanded}
          >
            {group.items.map((item) => (
              <NavListItem
                key={item.id}
                label={t(item.labelKey)}
                icon={item.icon}
                to={item.to}
                active={activeNavId === item.id}
                onClick={() => handleNavItemClick(item)}
              />
            ))}
          </NavListGroup>
        ))}
      </Sidebar>

      <CustomerDetailsModal
        show={showCustomerDetailsModal}
        onHide={() => setShowCustomerDetailsModal(false)}
      />
      <AccountsModal
        show={showAccountsModal}
        onHide={() => setShowAccountsModal(false)}
      />
      <SettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
      />
      <AuditLogModal
        show={showAuditLogModal}
        onHide={() => setShowAuditLogModal(false)}
      />
      <AssessmentModal
        show={showAssessmentModal}
        onHide={() => setShowAssessmentModal(false)}
      />
      <UserSettingsModal
        show={showUserSettingsModal}
        onHide={() => setShowUserSettingsModal(false)}
      />
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
      />
    </>
  );
}

export default AppSidebar;
