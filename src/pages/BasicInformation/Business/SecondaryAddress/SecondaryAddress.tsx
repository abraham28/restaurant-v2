import React from 'react';
import TextInput from 'atomic-components/TextInput/TextInput';
import type { BusinessFieldProps } from '../types';
import styles from './SecondaryAddress.module.scss';

type SecondaryAddressProps = BusinessFieldProps;

const SecondaryAddress = ({
  value,
  onChange,
  error,
  disabled = false,
}: SecondaryAddressProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Secondary Address</label>
        <TextInput
          value={value}
          onChange={onChange}
          placeholder="Enter secondary address"
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default SecondaryAddress;
