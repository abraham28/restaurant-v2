import React from 'react';
import DatePicker from 'atomic-components/DatePicker/DatePicker';
import type { BusinessFieldProps } from '../types';
import styles from './UpdatedDateTime.module.scss';

type UpdatedDateTimeProps = BusinessFieldProps;

const UpdatedDateTime = ({
  value,
  onChange,
  error,
  disabled = false,
}: UpdatedDateTimeProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Updated Date Time</label>
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

export default UpdatedDateTime;
