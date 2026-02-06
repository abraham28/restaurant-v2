import React from 'react';
import NumberInput from 'atomic-components/NumberInput/NumberInput';
import styles from './TIN.module.scss';
import { TINProps } from './types';

const TIN = ({
  value,
  onChange,
  error,
  required = true,
  disabled = false,
}: TINProps) => {
  const numericValue =
    value === '' || value === undefined ? 0 : parseInt(value, 10) || 0;

  const handleChange = (n: number) => {
    onChange(n === 0 ? '' : String(n));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          TIN
          {required && <span className={styles.required}>*</span>}
        </label>
        <NumberInput
          value={numericValue}
          onChange={handleChange}
          placeholder="Enter TIN"
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default TIN;
