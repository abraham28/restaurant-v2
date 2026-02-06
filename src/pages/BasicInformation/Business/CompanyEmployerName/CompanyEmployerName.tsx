import React from 'react';
import TextInput from 'atomic-components/TextInput/TextInput';
import styles from './CompanyEmployerName.module.scss';
import { CompanyEmployerNameProps } from './types';

const CompanyEmployerName = ({
  value,
  onChange,
  error,
  required = true,
  disabled = false,
}: CompanyEmployerNameProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Company / Employer Name
          {required && <span className={styles.required}>*</span>}
        </label>
        <TextInput
          value={value}
          onChange={onChange}
          placeholder="Enter company or employer name"
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default CompanyEmployerName;
