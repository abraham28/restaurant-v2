import React, { forwardRef, useState, useEffect } from 'react';

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  /** The numeric value */
  value: number | undefined;
  /** Callback when value changes, receives the parsed number */
  onChange: (value: number) => void;
  /** Whether to parse as decimal (float) or integer. Default: false (integer) */
  decimal?: boolean;
  /** Minimum value (for validation, not enforced on input) */
  min?: number;
  /** Maximum value (for validation, not enforced on input) */
  max?: number;
}

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

      // Always update the display value to allow free typing
      setDisplayValue(inputValue);

      // Allow empty input
      if (inputValue === '') {
        onChange(0);
        return;
      }

      // Try to parse the value
      const parsed = decimal
        ? parseFloat(inputValue)
        : parseInt(inputValue, 10);

      // Only update the numeric value if parsing succeeds
      // This allows users to type intermediate invalid states (like "12a" or "-")
      if (!isNaN(parsed)) {
        // Apply min/max constraints if provided
        let finalValue = parsed;
        if (min !== undefined && finalValue < min) {
          finalValue = min;
        }
        if (max !== undefined && finalValue > max) {
          finalValue = max;
        }

        onChange(finalValue);
      }
      // If parsing fails, we don't call onChange, but the display value is updated
      // This allows users to continue typing and fix their input
    };

    // Merge form-control class with provided className
    const inputClassName = `form-control ${className}`.trim();

    return (
      <input
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClassName}
        {...restProps}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
