import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'atomic-components/Link';
import Button from 'atomic-components/Button';
import { ROUTES } from 'utils/constants';
import styles from './PageNotFound.module.scss';

function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>{t('pageNotFound')}</h2>
        <p className={styles.description}>
          {t(
            'pageNotFoundDescription',
            'The page you are looking for does not exist.',
          )}
        </p>
        <Link to={ROUTES.HOME}>
          <Button variant="primary" size="lg">
            {t('backToHome', 'Back to Home')}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
