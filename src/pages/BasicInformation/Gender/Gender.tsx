import React, { useMemo } from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput/AutocompleteInput';
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
        <AutocompleteInput
          value={gender}
          onChange={handleChange}
          suggestions={genderOptions}
          placeholder="Type to search..."
        />
      </div>
    </div>
  );
};

export default Gender;
