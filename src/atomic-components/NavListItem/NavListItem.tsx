import React from 'react';
import { Link } from 'react-router-dom';
import type { NavListItemProps } from './types';
import styles from './NavListItem.module.scss';

function NavListItem({
  label,
  icon: Icon,
  onClick,
  to,
  active = false,
  children,
  className = '',
}: NavListItemProps) {
  const content = (
    <>
      {Icon && (
        <span>
          <Icon size={19} strokeWidth={1.8} />
        </span>
      )}
      {label}
      {children}
    </>
  );

  const baseClassName = `${styles.navListItem} ${className}`.trim();
  const linkClassName =
    `${styles.navLink} ${active ? styles.active : ''}`.trim();

  if (to) {
    return (
      <li className={baseClassName}>
        <Link to={to} className={linkClassName} onClick={onClick}>
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li className={baseClassName}>
      <button
        type="button"
        className={linkClassName}
        onClick={onClick}
        aria-label={label}
      >
        {content}
      </button>
    </li>
  );
}

export default NavListItem;
