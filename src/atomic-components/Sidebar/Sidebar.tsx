import React from 'react';
import Link from 'atomic-components/Link';
import { ROUTES } from 'utils/constants';
import type { SidebarProps } from './types';
import styles from './Sidebar.module.scss';

function Sidebar({
  logo,
  logoAlt = 'Logo',
  title,
  children,
  className = '',
  userProfile,
  userActions,
}: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${className}`.trim()}>
      <div className={styles.sidebarHeader}>
        <Link to={ROUTES.HOME} className={styles.sidebarTitleContainer}>
          {logo && (
            <img src={logo} alt={logoAlt} className={styles.sidebarLogo} />
          )}
          <span className={styles.sidebarTitle}>{title}</span>
        </Link>
      </div>
      {(userProfile || userActions) && (
        <div className={styles.userProfileSection}>
          {userProfile && (
            <div className={styles.userProfileBlock}>{userProfile}</div>
          )}
          {userActions && (
            <div className={styles.userActionsBlock}>{userActions}</div>
          )}
        </div>
      )}
      <nav className={styles.nav}>
        <ul className={styles.navList}>{children}</ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
