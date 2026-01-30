import React, { forwardRef, useState, useEffect } from 'react';
import styles from './NumberInput.module.scss';
import { NumberInputProps } from './types';

/**
 * NumberInput component that accepts text input and automatically parses to number.
 * This allows free text input while still working as a number field.
 * Users can type anything, and validation happens when a valid number is entered.
 */
const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      decimal = false,
      min,
      max,
      className = '',
      placeholder,
      ...restProps
    },
    ref,
  ) => {
    // Internal state to track what the user is typing (allows any text)
    const [displayValue, setDisplayValue] = useState<string>('');

    // Sync display value when external value changes
    useEffect(() => {
      if (value === undefined || value === null || value === 0) {
        setDisplayValue('');
      } else {
        setDisplayValue(String(value));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Allow empty input
      if (inputValue === '') {
        setDisplayValue('');
        onChange(0);
        return;
      }

      // Filter out non-numeric characters
      // Allow: digits, decimal point (if decimal), minus sign (only at start)
      let filteredValue = '';
      for (let i = 0; i < inputValue.length; i++) {
        const char = inputValue[i];
        if (char >= '0' && char <= '9') {
          filteredValue += char;
        } else if (decimal && char === '.' && !filteredValue.includes('.')) {
          filteredValue += char;
        } else if (char === '-' && filteredValue === '' && i === 0) {
          filteredValue += char;
        }
      }

      // Update display value with filtered input
      setDisplayValue(filteredValue);

      // Try to parse the value
      const parsed = decimal
        ? parseFloat(filteredValue)
        : parseInt(filteredValue, 10);

      // Only update the numeric value if parsing succeeds
      if (!isNaN(parsed) && filteredValue !== '' && filteredValue !== '-') {
        // Apply min/max constraints if provided
        let finalValue = parsed;
        if (min !== undefined && finalValue < min) {
          finalValue = min;
        }
        if (max !== undefined && finalValue > max) {
          finalValue = max;
        }

        onChange(finalValue);
      } else if (filteredValue === '' || filteredValue === '-') {
        onChange(0);
      }
    };

    // Merge styles with provided className
    const inputClassName = `${styles.input} ${className}`.trim();

    return (
      <div className={styles.container}>
        <input
          ref={ref}
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClassName}
          {...restProps}
        />
      </div>
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
