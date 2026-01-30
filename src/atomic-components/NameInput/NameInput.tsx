import React from 'react';
import styles from './NameInput.module.scss';
import { NameInputProps } from './types';

const NameInput: React.FC<NameInputProps> = ({
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  onBlur,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Filter out numeric characters (0-9)
    // Allow: letters, spaces, hyphens, apostrophes, and other common name characters
    let filteredValue = '';
    for (let i = 0; i < inputValue.length; i++) {
      const char = inputValue[i];
      // Allow letters (a-z, A-Z), spaces, hyphens, apostrophes, and periods
      if (
        (char >= 'a' && char <= 'z') ||
        (char >= 'A' && char <= 'Z') ||
        char === ' ' ||
        char === '-' ||
        char === "'" ||
        char === '.'
      ) {
        filteredValue += char;
      }
    }

    onChange(filteredValue);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <input
        type="text"
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

export default NameInput;
