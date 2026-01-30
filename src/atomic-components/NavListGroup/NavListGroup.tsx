import React from 'react';
import type { NavListGroupProps } from './types';
import styles from './NavListGroup.module.scss';

function NavListGroup({ label, children, className = '' }: NavListGroupProps) {
  return (
    <li className={`${styles.navListGroup} ${className}`.trim()}>
      <div className={styles.navGroupLabel}>{label}</div>
      <ul className={styles.navSubList}>{children}</ul>
    </li>
  );
}

export default NavListGroup;
