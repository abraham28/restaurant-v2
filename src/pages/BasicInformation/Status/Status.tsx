import React, { useMemo } from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput/AutocompleteInput';
import { useIndividualStore } from 'stores/IndividualStore';
import styles from './Status.module.scss';

const Status = () => {
  const maritalStatus = useIndividualStore(
    (state) => state.formData.maritalStatus,
  );
  const setFormData = useIndividualStore((state) => state.setFormData);

  const maritalStatusOptions = useMemo(
    () => ['Single', 'Married', 'Divorced', 'Widowed', 'Separated', 'Other'],
    [],
  );

  const handleChange = (value: string) => {
    setFormData({ maritalStatus: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Status</label>
        <AutocompleteInput
          value={maritalStatus}
          onChange={handleChange}
          suggestions={maritalStatusOptions}
          placeholder="Type to search..."
        />
      </div>
    </div>
  );
};

export default Status;
