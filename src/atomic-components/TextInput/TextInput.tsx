import React from 'react';
import styles from './TextInput.module.scss';
import { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  type = 'text',
  className = '',
  onBlur,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={styles.input}
      />
    </div>
  );
};

export default TextInput;
