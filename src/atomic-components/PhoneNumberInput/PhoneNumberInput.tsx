import React, { useState, useEffect, useRef } from 'react';
import TextInput from 'atomic-components/TextInput/TextInput';
import styles from './PhoneNumberInput.module.scss';
import { PhoneNumberInputProps } from './types';

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  onBlur,
  className = '',
  placeholder = '+63 9** *** ****',
  disabled = false,
}) => {
  const [displayValue, setDisplayValue] = useState(value || '');
  const isUserTypingRef = useRef(false);

  // Format phone number: remove spaces and +, then convert to +63 format when complete
  const formatPhoneNumber = (
    value: string,
    isBlur: boolean = false,
  ): string => {
    // Remove all non-digit characters (including + and spaces)
    const digits = value.replace(/\D/g, '');

    if (digits.length === 0) return '';

    // Check if original input starts with +63
    const startsWithPlus63 = value.replace(/\s/g, '').startsWith('+63');

    if (startsWithPlus63) {
      // Limit to 12 digits total (+63 + 9 digits = 12)
      const limitedDigits = digits.slice(0, 12);

      if (isBlur && limitedDigits.length >= 5) {
        // Format: +63 917 123 4567
        const countryCode = limitedDigits.slice(0, 2);
        const mobileNum = limitedDigits.slice(2);

        if (mobileNum.length <= 3) {
          return `+${countryCode} ${mobileNum}`;
        } else if (mobileNum.length <= 6) {
          return `+${countryCode} ${mobileNum.slice(0, 3)} ${mobileNum.slice(3)}`;
        } else {
          return `+${countryCode} ${mobileNum.slice(0, 3)} ${mobileNum.slice(3, 6)} ${mobileNum.slice(6, 10)}`;
        }
      } else {
        // While typing, show as typed (with +63 but no spaces)
        return `+${limitedDigits}`;
      }
    } else if (digits.startsWith('09')) {
      // Limit to 11 digits total (09 + 9 digits)
      const limitedDigits = digits.slice(0, 11);

      if (isBlur && limitedDigits.length >= 11) {
        // Format: +63 917 123 4567
        const withoutZero = limitedDigits.slice(1); // Remove the 0
        return `+63 ${withoutZero.slice(0, 3)} ${withoutZero.slice(3, 6)} ${withoutZero.slice(6, 10)}`;
      } else {
        // While typing, show without + and spaces
        return limitedDigits;
      }
    } else {
      // Other formats - limit based on context
      const limitedDigits = digits.slice(0, 11);

      if (isBlur && limitedDigits.length >= 9) {
        // Format: +63 917 123 4567
        const mobileNum = limitedDigits.slice(-9); // Get last 9 digits
        return `+63 ${mobileNum.slice(0, 3)} ${mobileNum.slice(3, 6)} ${mobileNum.slice(6, 10)}`;
      } else {
        // While typing, show digits only
        return limitedDigits;
      }
    }
  };

  // Sync display value when prop value changes (only when not typing)
  useEffect(() => {
    if (isUserTypingRef.current) {
      // User is typing, don't update from prop
      return;
    }

    // Convert stored +63 format back to 09 format for display
    if (value && value.startsWith('+63')) {
      // Extract mobile number from +63 format
      const digits = value.replace(/\D/g, '');
      const mobileNum = digits.slice(2); // Remove 63
      if (mobileNum) {
        setDisplayValue(`0${mobileNum}`);
      } else {
        setDisplayValue('');
      }
    } else if (value) {
      setDisplayValue(value);
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleChange = (inputValue: string) => {
    isUserTypingRef.current = true;

    // Remove all non-digit characters for processing
    const digits = inputValue.replace(/\D/g, '');

    // Check if starts with +63 (12 digits limit)
    const startsWithPlus63 = inputValue.replace(/\s/g, '').startsWith('+63');

    let formatted = '';
    let outputValue = '';

    if (startsWithPlus63) {
      // Limit to 12 digits (+63 + 9 digits)
      const limitedDigits = digits.slice(0, 12);
      formatted = formatPhoneNumber(inputValue, false);
      setDisplayValue(formatted);

      if (limitedDigits.length >= 5) {
        const mobileNum = limitedDigits.slice(2); // Remove 63
        outputValue =
          `+63 ${mobileNum.slice(0, 3)} ${mobileNum.slice(3, 6)} ${mobileNum.slice(6, 10)}`.trim();
      } else {
        outputValue = formatted;
      }
    } else if (digits.startsWith('09')) {
      // Limit to 11 digits (09 + 9 digits)
      const limitedDigits = digits.slice(0, 11);
      formatted = formatPhoneNumber(inputValue, false);
      setDisplayValue(formatted);

      if (limitedDigits.length >= 2) {
        const withoutZero = limitedDigits.slice(1); // Remove the 0
        outputValue =
          `+63 ${withoutZero.slice(0, 3)} ${withoutZero.slice(3, 6)} ${withoutZero.slice(6, 10)}`.trim();
      } else {
        outputValue = formatted;
      }
    } else {
      // Other formats
      formatted = formatPhoneNumber(inputValue, false);
      setDisplayValue(formatted);

      if (digits.length >= 9) {
        const mobileNum = digits.slice(-9); // Get last 9 digits
        outputValue =
          `+63 ${mobileNum.slice(0, 3)} ${mobileNum.slice(3, 6)} ${mobileNum.slice(6, 10)}`.trim();
      } else {
        outputValue = formatted;
      }
    }

    // Call onChange with formatted value
    onChange(outputValue);

    // Reset flag after a short delay
    setTimeout(() => {
      isUserTypingRef.current = false;
    }, 100);
  };

  const handleBlur = () => {
    // Format with +63 and spaces when user finishes typing
    const formatted = formatPhoneNumber(displayValue, true);
    setDisplayValue(formatted);

    // Extract and format final value
    const digits = displayValue.replace(/\D/g, '');

    let finalValue = '';

    if (digits.startsWith('09')) {
      const withoutZero = digits.slice(1); // Remove the 0
      if (withoutZero.length >= 9) {
        finalValue = `+63 ${withoutZero.slice(0, 3)} ${withoutZero.slice(3, 6)} ${withoutZero.slice(6, 10)}`;
      } else {
        finalValue = formatted;
      }
    } else if (digits.length >= 5) {
      // Check if starts with 63
      if (digits.startsWith('63')) {
        const mobileNum = digits.slice(2); // Remove 63
        if (mobileNum.length >= 9) {
          finalValue = `+63 ${mobileNum.slice(0, 3)} ${mobileNum.slice(3, 6)} ${mobileNum.slice(6, 10)}`;
        } else {
          finalValue = formatted;
        }
      } else if (digits.length >= 9) {
        const mobileNum = digits.slice(-9); // Get last 9 digits
        finalValue = `+63 ${mobileNum.slice(0, 3)} ${mobileNum.slice(3, 6)} ${mobileNum.slice(6, 10)}`;
      } else {
        finalValue = formatted;
      }
    } else {
      finalValue = formatted;
    }

    // Call onChange with final formatted value
    onChange(finalValue);

    // Call onBlur callback if provided
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <TextInput
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneNumberInput;
