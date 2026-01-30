import React from 'react';
import { Menu, X } from 'lucide-react';
import type { SidebarProps } from './types';
import styles from './Sidebar.module.scss';

function Sidebar({
  isOpen,
  onClose,
  onToggle,
  logo,
  logoAlt = 'Logo',
  title,
  children,
  className = '',
}: SidebarProps) {
  return (
    <>
      {/* Burger Icon Button */}
      {!isOpen && (
        <button
          className={styles.burgerButton}
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          <Menu size={16} />
        </button>
      )}

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${className}`.trim()}
      >
        <div className={styles.sidebarHeader}>
          {logo && (
            <img src={logo} alt={logoAlt} className={styles.sidebarLogo} />
          )}
          <span className={styles.sidebarTitle}>{title}</span>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>{children}</ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
