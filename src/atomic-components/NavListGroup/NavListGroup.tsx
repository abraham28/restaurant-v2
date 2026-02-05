import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import type { NavListGroupProps } from './types';
import styles from './NavListGroup.module.scss';

function NavListGroup({
  label,
  icon: Icon,
  children,
  className = '',
  collapsible = false,
  defaultExpanded = true,
  to,
  onClick,
  active = false,
}: NavListGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = (e?: React.MouseEvent) => {
    // Prevent navigation if clicking the chevron
    if (e && (e.target as HTMLElement).closest(`.${styles.chevronIcon}`)) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (collapsible) {
      setIsExpanded((prev) => !prev);
    }
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    // If clicking the chevron, prevent navigation and only toggle expansion
    if ((e.target as HTMLElement).closest(`.${styles.chevronIcon}`)) {
      e.preventDefault();
      e.stopPropagation();
      if (collapsible) {
        setIsExpanded((prev) => !prev);
      }
      return;
    }

    // If there's a navigation link (to prop) and the group is expanded,
    // don't toggle - just navigate
    if (to && collapsible && isExpanded) {
      // Just navigate, don't collapse
      if (onClick) {
        onClick();
      }
      return;
    }

    // If collapsible, toggle expansion when clicking the label
    if (collapsible) {
      handleToggle();
    }

    // Call onClick handler if provided
    if (onClick) {
      onClick();
    }
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (collapsible) {
      setIsExpanded((prev) => !prev);
    }
  };

  const labelContent = (
    <>
      <span className={styles.navGroupLabelContent}>
        {Icon && (
          <span className={styles.navGroupIcon}>
            <Icon size={19} strokeWidth={1.8} />
          </span>
        )}
        {label}
      </span>
      {collapsible && (
        <span className={styles.chevronContainer} onClick={handleChevronClick}>
          <ChevronDown
            className={`${styles.chevronIcon} ${
              isExpanded ? styles.chevronIconExpanded : ''
            }`}
            size={16}
          />
        </span>
      )}
    </>
  );

  const labelClassName = `${styles.navGroupLabel} ${
    Icon ? styles.navGroupLabelWithIcon : ''
  } ${
    collapsible || to ? styles.navGroupLabelClickable : ''
  } ${isExpanded ? styles.navGroupLabelExpanded : ''} ${
    active ? styles.active : ''
  }`.trim();

  return (
    <li className={`${styles.navListGroup} ${className}`.trim()}>
      {to ? (
        <Link
          to={to}
          className={labelClassName}
          onClick={handleLabelClick}
          role={collapsible ? 'button' : undefined}
          tabIndex={collapsible || to ? 0 : undefined}
          onKeyDown={(e) => {
            if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleToggle();
            }
          }}
          aria-expanded={collapsible ? isExpanded : undefined}
        >
          {labelContent}
        </Link>
      ) : (
        <div
          className={labelClassName}
          onClick={handleLabelClick}
          role={collapsible ? 'button' : undefined}
          tabIndex={collapsible ? 0 : undefined}
          onKeyDown={(e) => {
            if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleToggle();
            }
          }}
          aria-expanded={collapsible ? isExpanded : undefined}
        >
          {labelContent}
        </div>
      )}
      <ul
        className={`${styles.navSubList} ${
          collapsible && !isExpanded ? styles.navSubListCollapsed : ''
        }`}
      >
        {children}
      </ul>
    </li>
  );
}

export default NavListGroup;
