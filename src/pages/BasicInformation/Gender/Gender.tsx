import React, { useMemo } from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput/AutocompleteInput';
import { useIndividualStore } from 'stores/IndividualStore';
import styles from './Gender.module.scss';

const Gender = () => {
  const gender = useIndividualStore((state) => state.formData.gender);
  const setFormData = useIndividualStore((state) => state.setFormData);

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
