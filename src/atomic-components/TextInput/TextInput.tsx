import React from 'react';
import styles from './TextInput.module.scss';
import { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  className = '',
  type = 'text',
  ...props
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
        className={styles.input}
        autoComplete="off"
        {...props}
      />
    </div>
  );
};

export default TextInput;
