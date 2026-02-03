import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import styles from './UserActions.module.scss';
import { UserActionsProps } from './types';

function UserActions({ onSettingsClick, onLogoutClick }: UserActionsProps) {
  return (
    <>
      <button
        className={styles.iconButton}
        onClick={onSettingsClick}
        aria-label="User Settings"
        title="User Settings"
      >
        <Settings size={18} />
      </button>
      <button
        className={styles.iconButton}
        onClick={onLogoutClick}
        aria-label="Logout"
        title="Logout"
      >
        <LogOut size={18} />
      </button>
    </>
  );
}

export default UserActions;
