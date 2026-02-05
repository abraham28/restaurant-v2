import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, LogOut } from 'lucide-react';
import styles from './UserActions.module.scss';
import { UserActionsProps } from './types';

function UserActions({ onSettingsClick, onLogoutClick }: UserActionsProps) {
  const { t } = useTranslation();

  return (
    <>
      <button
        className={styles.iconButton}
        onClick={onSettingsClick}
        aria-label={t('userSettings')}
        title={t('userSettings')}
      >
        <Settings size={18} />
      </button>
      <button
        className={styles.iconButton}
        onClick={onLogoutClick}
        aria-label={t('logout')}
        title={t('logout')}
      >
        <LogOut size={18} />
      </button>
    </>
  );
}

export default UserActions;
