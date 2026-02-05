import React from 'react';
import BirthdateInput from 'atomic-components/BirthdateInput/BirthdateInput';
import { useIndividualStore } from 'stores/IndividualStore';
import styles from './DateofBirth.module.scss';

const DateofBirth = () => {
  const birthDate = useIndividualStore((state) => state.formData.birthDate);
  const setFormData = useIndividualStore((state) => state.setFormData);

  const handleDateChange = (value: string) => {
    setFormData({ birthDate: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Date of Birth</label>
        <div className={styles.inputWrapper}>
          <BirthdateInput
            value={birthDate}
            onChange={handleDateChange}
            placeholder="Select birthdate"
          />
        </div>
      </div>
    </div>
  );
};

export default DateofBirth;
