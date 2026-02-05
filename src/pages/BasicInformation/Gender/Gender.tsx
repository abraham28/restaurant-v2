import React, { useMemo } from 'react';
import SelectDropdown from 'atomic-components/SelectDropdown/SelectDropdown';
import { useClientFormStore } from 'stores/clientFormStore';
import styles from './Gender.module.scss';

const Gender = () => {
  const gender = useClientFormStore((state) => state.formData.gender);
  const setFormData = useClientFormStore((state) => state.setFormData);

  const genderOptions = useMemo(
    () => ['Male', 'Female', 'Other', 'Prefer not to say'],
    [],
  );

  const handleChange = (value: string) => {
    setFormData({ gender: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Gender</label>
        <SelectDropdown
          value={gender}
          onChange={handleChange}
          options={genderOptions}
          placeholder="Select gender"
        />
      </div>
    </div>
  );
};

export default Gender;
