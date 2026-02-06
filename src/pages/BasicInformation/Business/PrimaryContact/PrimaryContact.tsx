import React from 'react';
import TextInput from 'atomic-components/TextInput/TextInput';
import type { BusinessFieldProps } from '../types';
import styles from './PrimaryContact.module.scss';

interface PrimaryContactProps extends BusinessFieldProps {
  required?: boolean;
}

const PrimaryContact = ({
  value,
  onChange,
  error,
  required = true,
  disabled = false,
}: PrimaryContactProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Primary Contact
          {required && <span className={styles.required}>*</span>}
        </label>
        <TextInput
          value={value}
          onChange={onChange}
          placeholder="Enter primary contact"
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default PrimaryContact;
