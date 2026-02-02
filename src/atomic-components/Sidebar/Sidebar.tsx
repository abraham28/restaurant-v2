import React from 'react';
import type { SidebarProps } from './types';
import styles from './Sidebar.module.scss';

function Sidebar({
  logo,
  logoAlt = 'Logo',
  title,
  children,
  className = '',
}: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${className}`.trim()}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarTitleContainer}>
          {logo && (
            <img src={logo} alt={logoAlt} className={styles.sidebarLogo} />
          )}
          <span className={styles.sidebarTitle}>{title}</span>
        </div>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>{children}</ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
