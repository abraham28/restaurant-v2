import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import type { HeaderProps } from './types';
import styles from './Header.module.scss';

function Header({
  appName,
  navItems = [],
  profileContent,
  profileTitle,
  isDropdownOpen = false,
  onProfileClick,
  dropdownHeader,
  dropdownItems = [],
  dropdownSections = [],
  className = '',
}: HeaderProps) {
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!profileContent || !onProfileClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Don't close here - let parent handle it via onProfileClick
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, profileContent, onProfileClick]);

  return (
    <header className={`${styles.header} ${className}`.trim()}>
      <div className={styles.headerContainer}>
        <div className={styles.appName}>{appName}</div>
        {navItems.length > 0 && (
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${styles.navLink} ${
                  item.active ? styles.active : ''
                }`.trim()}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        {profileContent && (
          <div className={styles.profileContainer} ref={dropdownRef}>
            <button
              className={styles.profileButton}
              onClick={onProfileClick}
              aria-label={t('profileMenu')}
              title={profileTitle || t('profile')}
              disabled={!onProfileClick}
            >
              {profileContent}
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                {dropdownHeader && (
                  <div className={styles.dropdownHeader}>{dropdownHeader}</div>
                )}
                {dropdownItems.map((item, index) => (
                  <button
                    key={index}
                    className={`${styles.dropdownItem} ${
                      item.active ? styles.dropdownItemActive : ''
                    }`.trim()}
                    onClick={item.onClick}
                  >
                    {item.icon && <item.icon size={18} />}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={styles.ownerBadge}>{item.badge}</span>
                    )}
                    {item.showCheck && (
                      <Check size={16} className={styles.checkIcon} />
                    )}
                  </button>
                ))}
                {dropdownSections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {(dropdownItems.length > 0 || sectionIndex > 0) && (
                      <div className={styles.dropdownDivider} />
                    )}
                    <div className={styles.dropdownSection}>
                      <div className={styles.dropdownSectionLabel}>
                        {section.label}
                      </div>
                      {section.items.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          className={`${styles.dropdownItem} ${
                            item.showCheck ? styles.dropdownItemWithCheck : ''
                          } ${item.active ? styles.dropdownItemActive : ''}`.trim()}
                          onClick={item.onClick}
                        >
                          <div className={styles.dropdownItemContent}>
                            {item.icon && <item.icon size={18} />}
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className={styles.ownerBadge}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.showCheck && (
                            <Check size={16} className={styles.checkIcon} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {dropdownItems.length > 0 || dropdownSections.length > 0 ? (
                  <div className={styles.dropdownDivider} />
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
