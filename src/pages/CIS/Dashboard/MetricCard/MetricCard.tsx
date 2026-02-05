import React from 'react';
import styles from './MetricCard.module.scss';
import type { MetricCardProps } from './types';

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  subtext,
  subtextVariant = 'blue',
  className = '',
}) => {
  const cardClass = [styles.card, className].filter(Boolean).join(' ');
  const subtextClass = subtextVariant
    ? [styles.subtext, styles[`subtext_${subtextVariant}`]]
        .filter(Boolean)
        .join(' ')
    : styles.subtext;

  return (
    <div className={cardClass}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.value}>{value}</div>
      {subtext != null && subtext !== '' && (
        <div className={subtextClass}>{subtext}</div>
      )}
    </div>
  );
};

export default MetricCard;
