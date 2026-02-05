import React, { useState, useEffect, useRef } from 'react';
import TextInput from 'atomic-components/TextInput/TextInput';
import { useClientFormStore } from 'stores/clientFormStore';
import styles from './PhoneNumber.module.scss';

const PhoneNumber = () => {
  const countryCode = useClientFormStore((state) => state.formData.countryCode);
  const mobileNumber = useClientFormStore(
    (state) => state.formData.mobileNumber,
  );
  const setFormData = useClientFormStore((state) => state.setFormData);
  const [displayValue, setDisplayValue] = useState('');
  const isUserTypingRef = useRef(false);

  // Format phone number with spaces: +63 917 123 4567
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, '');

    // If starts with +, keep it
    if (cleaned.startsWith('+')) {
      const digits = cleaned.slice(1).replace(/\D/g, '');
      if (digits.length === 0) return '+';

      // Format: +63 917 123 4567
      if (digits.length <= 2) {
        return `+${digits}`;
      } else if (digits.length <= 5) {
        return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 8) {
        return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      } else {
        return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 12)}`;
      }
    } else {
      // No + prefix, add it automatically if user types digits
      const digits = cleaned.replace(/\D/g, '');
      if (digits.length === 0) return '';

      // Auto-add + if user starts typing
      if (digits.length <= 2) {
        return `+${digits}`;
      } else if (digits.length <= 5) {
        return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 8) {
        return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      } else {
        return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 12)}`;
      }
    }
  };

  // Initialize display value from store (only when store changes externally, not from user typing)
  useEffect(() => {
    if (isUserTypingRef.current) {
      // User is typing, don't update from store
      return;
    }

    const fullNumber =
      countryCode && mobileNumber
        ? `${countryCode}${mobileNumber}`.replace(/\D/g, '')
        : mobileNumber || '';

    if (fullNumber) {
      const formatted = formatPhoneNumber(
        fullNumber.startsWith('+') ? fullNumber : `+${fullNumber}`,
      );
      setDisplayValue(formatted);
    } else {
      setDisplayValue('');
    }
  }, [countryCode, mobileNumber]);

  const handleChange = (value: string) => {
    isUserTypingRef.current = true;
    const formatted = formatPhoneNumber(value);
    setDisplayValue(formatted);

    // Extract country code and mobile number
    const cleaned = formatted.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      const code = cleaned.slice(0, 2);
      const number = cleaned.slice(2);
      setFormData({
        countryCode: `+${code}`,
        mobileNumber: number,
      });
    } else if (cleaned.length > 0) {
      setFormData({
        countryCode: `+${cleaned}`,
        mobileNumber: '',
      });
    } else {
      setFormData({
        countryCode: '',
        mobileNumber: '',
      });
    }

    // Reset flag after a short delay
    setTimeout(() => {
      isUserTypingRef.current = false;
    }, 100);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Phone Number</label>
        <TextInput
          value={displayValue}
          onChange={handleChange}
          placeholder="+63 9** *** ****"
        />
      </div>
    </div>
  );
};

export default PhoneNumber;
