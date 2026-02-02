import React, { useState, useRef } from 'react';
import Link from 'atomic-components/Link';
import { useClickOutside } from 'hooks/useClickOutside';
import styles from './BreadcrumbDropdown.module.scss';
import { BreadcrumbDropdownProps } from './types';

const BreadcrumbDropdown: React.FC<BreadcrumbDropdownProps> = ({
  items,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.ellipsisContainer} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={styles.breadcrumbEllipsis}
        aria-label="Show more breadcrumbs"
        aria-expanded={isOpen}
      >
        ...
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={styles.dropdownItem}
              onClick={handleItemClick}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreadcrumbDropdown;
