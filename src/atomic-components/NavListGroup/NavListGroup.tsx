import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { NavListGroupProps } from './types';
import styles from './NavListGroup.module.scss';

function NavListGroup({
  label,
  children,
  className = '',
  collapsible = false,
  defaultExpanded = true,
}: NavListGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (collapsible) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <li className={`${styles.navListGroup} ${className}`.trim()}>
      <div
        className={`${styles.navGroupLabel} ${
          collapsible ? styles.navGroupLabelClickable : ''
        } ${isExpanded ? styles.navGroupLabelExpanded : ''}`}
        onClick={handleToggle}
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
        {label}
        {collapsible && (
          <ChevronDown
            className={`${styles.chevronIcon} ${
              isExpanded ? styles.chevronIconExpanded : ''
            }`}
            size={16}
          />
        )}
      </div>
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
