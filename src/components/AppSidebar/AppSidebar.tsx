import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from 'atomic-components/Sidebar';
import NavListItem from 'atomic-components/NavListItem';
import NavListGroup from 'atomic-components/NavListGroup';
import {
  useNavigationData,
  groupHasActiveItem,
  itemHasActiveChild,
  type NavItem,
} from 'hooks/useNavigationData';
import UserProfile from './UserProfile';
import UserActions from './UserActions';
import UserSettingsModal from './UserSettings';
import LogoutModal from './UserLogOut';

function AppSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Get navigation data with translated labels and active nav ID
  const { navigationGroups, activeNavId, setActiveNavId } = useNavigationData();

  /**
   * Handles navigation item clicks consistently
   * Sets the active nav ID when an item is clicked
   * @param item - The navigation item that was clicked
   */
  const handleNavItemClick = useCallback(
    (item: NavItem) => {
      setActiveNavId(item.id);
    },
    [setActiveNavId],
  );

  /**
   * Recursively renders navigation items, including nested sub-items
   * Note: This must be a separate render function since it calls itself recursively
   * to handle nested navigation items
   */
  const renderNavItems = useCallback(
    (items: NavItem[]): React.ReactNode[] => {
      return items.map((item) => {
        // If item has nested items, render as a collapsible group
        const nestedItems = item.items;
        if (nestedItems && nestedItems.length > 0) {
          return (
            <NavListGroup
              key={item.id}
              label={item.label}
              collapsible={true}
              defaultExpanded={itemHasActiveChild(item, location.pathname)}
            >
              {renderNavItems(nestedItems)}
            </NavListGroup>
          );
        }

        // Otherwise render as a regular list item
        return (
          <NavListItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            to={item.to}
            active={activeNavId === item.id}
            onClick={() => handleNavItemClick(item)}
          />
        );
      });
    },
    [activeNavId, location.pathname, handleNavItemClick],
  );

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
            label={group.label}
            defaultExpanded={groupHasActiveItem(group, location.pathname)}
          >
            {renderNavItems(group.items)}
          </NavListGroup>
        ))}
      </Sidebar>

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
