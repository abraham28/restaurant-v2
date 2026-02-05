import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, LogOut } from 'lucide-react';
import IconButton from 'atomic-components/IconButton';
import { UserActionsProps } from './types';

function UserActions({ onSettingsClick, onLogoutClick }: UserActionsProps) {
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        icon={Settings}
        onClick={onSettingsClick}
        aria-label={t('userSettings')}
      />
      <IconButton
        icon={LogOut}
        onClick={onLogoutClick}
        aria-label={t('logout')}
      />
    </>
  );
}

export default UserActions;
