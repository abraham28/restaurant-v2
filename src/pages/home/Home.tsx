import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'atomic-components/Link';
import Button from 'atomic-components/Button';
import { ROUTES } from 'utils/constants';
import styles from './Home.module.scss';

function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('appName')}</h1>
        <div className={styles.heroButtons}>
          <Link to={ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT}>
            <Button variant="primary" size="lg">
              {t('clientInformationSystem')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
