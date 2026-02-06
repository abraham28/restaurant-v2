import React from 'react';
import TextInput from 'atomic-components/TextInput/TextInput';
import styles from './SecondaryContact.module.scss';
import { SecondaryContactProps } from './types';

const SecondaryContact = ({
  value,
  onChange,
  error,
  disabled = false,
}: SecondaryContactProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Secondary Contact</label>
        <TextInput
          value={value}
          onChange={onChange}
          placeholder="Enter secondary contact"
          disabled={disabled}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default SecondaryContact;
