import React from 'react';
import DatePicker from 'atomic-components/DatePicker/DatePicker';
import styles from './OccupiedSince.module.scss';
import { OccupiedSinceProps } from './types';

const OccupiedSince = ({
  value,
  onChange,
  error,
  disabled = false,
}: OccupiedSinceProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Occupied Since</label>
        <DatePicker
          value={value}
          onChange={onChange}
          placeholder="Select date"
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default OccupiedSince;
