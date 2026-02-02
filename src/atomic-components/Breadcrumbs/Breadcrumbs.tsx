import React from 'react';
import Link from 'atomic-components/Link';
import { ChevronRight } from 'lucide-react';
import BreadcrumbDropdown from './BreadcrumbDropdown';
import styles from './Breadcrumbs.module.scss';
import { BreadcrumbsProps } from './types';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  ...props
}) => {
  // If no items, return null
  if (items.length === 0) {
    return null;
  }

  // Only show last 3 items if there are more than 3
  const displayItems = items.length > 3 ? items.slice(-3) : items;
  const hiddenItems = items.length > 3 ? items.slice(0, -3) : [];
  const showEllipsis = items.length > 3;
  const isSingleItem = items.length === 1;

  return (
    <nav
      className={`${styles.breadcrumbs} ${
        isSingleItem ? styles.singleItem : ''
      } ${className}`}
      {...props}
    >
      <ol className={styles.breadcrumbList}>
        {displayItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === displayItems.length - 1;
          const displayText = showEllipsis && isFirst ? '...' : item.title;

          return (
            <li key={index} className={styles.breadcrumbItem}>
              {showEllipsis && isFirst ? (
                <BreadcrumbDropdown items={hiddenItems} />
              ) : isLast ? (
                <span className={styles.breadcrumbCurrent}>{displayText}</span>
              ) : (
                <Link to={item.href} className={styles.breadcrumbLink}>
                  {displayText}
                </Link>
              )}
              {!isLast && !isSingleItem && (
                <ChevronRight
                  className={styles.breadcrumbSeparator}
                  size={24}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
