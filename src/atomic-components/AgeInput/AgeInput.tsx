import React from 'react';
import styles from './AgeInput.module.scss';
import { AgeInputProps } from './types';

const AgeInput: React.FC<AgeInputProps> = ({
  value,
  placeholder = '',
  className = '',
  ...restProps
}) => {
  // Convert number to string for display, or empty string if undefined/null/0
  const displayValue = value && value > 0 ? String(value) : '';

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={displayValue}
        readOnly
        placeholder={placeholder}
        className={`${styles.input} ${className}`.trim()}
        {...restProps}
      />
    </div>
  );
};

export default AgeInput;
