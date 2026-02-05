import React, { useMemo } from 'react';
import SelectDropdown from 'atomic-components/SelectDropdown/SelectDropdown';
import { useClientFormStore } from 'stores/clientFormStore';
import styles from './Status.module.scss';

const Status = () => {
  const maritalStatus = useClientFormStore(
    (state) => state.formData.maritalStatus,
  );
  const setFormData = useClientFormStore((state) => state.setFormData);

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
        <SelectDropdown
          value={maritalStatus}
          onChange={handleChange}
          options={maritalStatusOptions}
          placeholder="Select status"
        />
      </div>
    </div>
  );
};

export default Status;
