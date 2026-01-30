import React from 'react';
import styles from './Textarea.module.scss';
import { TextareaProps } from './types';

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  onBlur,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={styles.textarea}
      />
    </div>
  );
};

export default Textarea;
