import React from 'react';
import TextInput from 'atomic-components/TextInput/TextInput';
import styles from './OwnerLease.module.scss';
import { OwnerLeaseProps } from './types';

const OwnerLease = ({
  value,
  onChange,
  error,
  disabled = false,
}: OwnerLeaseProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Owner / Lease</label>
        <TextInput
          value={value}
          onChange={onChange}
          placeholder="Enter owner or lease"
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default OwnerLease;
