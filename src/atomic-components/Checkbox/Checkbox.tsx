import React from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './types';

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  className = '',
  disabled = false,
  id,
}) => {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  return (
    <label
      className={`${styles.checkboxLabel} ${className} ${
        disabled ? styles.disabled : ''
      }`}
    >
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.checkbox}
      />
      {label && <span className={styles.labelText}>{label}</span>}
    </label>
  );
};

export default Checkbox;
