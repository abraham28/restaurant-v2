import React from 'react';
import styles from './RequiredFieldBullet.module.scss';
import { RequiredFieldBulletProps } from './types';

/**
 * RequiredFieldBullet component displays a colored bullet indicator
 * to mark required fields in forms.
 * - CIC: Blue gradient bullet for CIC required fields
 * - AMLA: Yellow/gold gradient bullet for AMLA required fields
 */
const RequiredFieldBullet: React.FC<RequiredFieldBulletProps> = ({
  type = 'cic',
  className = '',
}) => {
  const bulletClass = type === 'amla' ? styles.amlaBullet : styles.cicBullet;

  return (
    <span className={`${bulletClass} ${className}`.trim()} aria-hidden="true" />
  );
};

export default RequiredFieldBullet;
