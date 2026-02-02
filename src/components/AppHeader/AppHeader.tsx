import React from 'react';
import Header from 'atomic-components/Header';
import ContentWrapper from 'atomic-components/ContentWrapper';
import Breadcrumbs from 'atomic-components/Breadcrumbs';
import { useBreadcrumbs } from './useBreadcrumbs';
import styles from './AppHeader.module.scss';

function AppHeader() {
  const breadcrumbItems = useBreadcrumbs();

  return (
    <ContentWrapper>
      <Header>
        <div className={styles.headerContainer}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </Header>
    </ContentWrapper>
  );
}

export default AppHeader;
