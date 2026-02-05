import React, { useEffect, useState } from 'react';
import PhoneNumberInput from 'atomic-components/PhoneNumberInput';
import { useClientFormStore } from 'stores/clientFormStore';
import styles from './PhoneNumber.module.scss';

const PhoneNumber = () => {
  const countryCode = useClientFormStore((state) => state.formData.countryCode);
  const mobileNumber = useClientFormStore(
    (state) => state.formData.mobileNumber,
  );
  const setFormData = useClientFormStore((state) => state.setFormData);
  const [formattedValue, setFormattedValue] = useState('');

  // Build formatted value from store for display
  useEffect(() => {
    if (countryCode === '+63' && mobileNumber) {
      // Format: +63 917 123 4567
      const formatted =
        `+63 ${mobileNumber.slice(0, 3)} ${mobileNumber.slice(3, 6)} ${mobileNumber.slice(6, 10)}`.trim();
      setFormattedValue(formatted);
    } else {
      setFormattedValue('');
    }
  }, [countryCode, mobileNumber]);

  const handleChange = (value: string) => {
    // Parse formatted value to extract countryCode and mobileNumber
    const digits = value.replace(/\D/g, ''); // Remove all non-digits

    if (digits.startsWith('63') && digits.length >= 5) {
      // Extract mobile number (remove 63 prefix)
      const mobileNum = digits.slice(2);
      setFormData({
        countryCode: '+63',
        mobileNumber: mobileNum,
      });
    } else if (digits.startsWith('09') && digits.length >= 11) {
      // Extract mobile number (remove 09 prefix)
      const mobileNum = digits.slice(1);
      setFormData({
        countryCode: '+63',
        mobileNumber: mobileNum,
      });
    } else if (digits.length >= 9) {
      // Get last 9 digits as mobile number
      const mobileNum = digits.slice(-9);
      setFormData({
        countryCode: '+63',
        mobileNumber: mobileNum,
      });
    } else if (digits.length > 0) {
      setFormData({
        countryCode: '+63',
        mobileNumber: digits,
      });
    } else {
      setFormData({
        countryCode: '',
        mobileNumber: '',
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Phone Number</label>
        <PhoneNumberInput
          value={formattedValue}
          onChange={handleChange}
          placeholder="+63 9** *** ****"
        />
      </div>
    </div>
  );
};

export default PhoneNumber;
