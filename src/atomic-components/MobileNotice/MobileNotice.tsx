import React from 'react';
import styles from './MobileNotice.module.scss';
import type { MobileNoticeProps } from './types';

function MobileNotice({ className = '' }: MobileNoticeProps) {
  return (
    <div className={`${styles.mobileNotice} ${className}`.trim()}>
      <div className={styles.mobileNoticeContent}>
        <div className={styles.mobileNoticeIcon}>💻</div>
        <div className={styles.mobileNoticeText}>
          <h3 className={styles.mobileNoticeTitle}>
            Better Experience on Desktop
          </h3>
          <p className={styles.mobileNoticeMessage}>
            For the best experience, we recommend accessing this application on
            a desktop or tablet with a larger screen. The full features and
            optimal layout are designed for desktop use.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobileNotice;
