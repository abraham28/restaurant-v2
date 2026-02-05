import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ClientInformationSystem.module.scss';
import Dashboard from 'pages/CIS/Dashboard';
import ClientSearch from './ClientSearch';

function ClientInformationSystem() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('CIS Dashboard Overview')}</h1>
      <Dashboard />
      <ClientSearch />
    </div>
  );
}

export default ClientInformationSystem;
