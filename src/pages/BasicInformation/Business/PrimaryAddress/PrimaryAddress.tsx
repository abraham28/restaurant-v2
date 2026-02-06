import React from 'react';
import TextInput from 'atomic-components/TextInput/TextInput';
import styles from './PrimaryAddress.module.scss';
import { PrimaryAddressProps } from './types';

const PrimaryAddress = ({
  value,
  onChange,
  error,
  required = true,
  disabled = false,
}: PrimaryAddressProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Primary Address
          {required && <span className={styles.required}>*</span>}
        </label>
        <TextInput
          value={value}
          onChange={onChange}
          placeholder="Enter primary address"
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default PrimaryAddress;
