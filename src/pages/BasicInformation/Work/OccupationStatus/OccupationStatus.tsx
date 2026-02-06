import React, { useMemo } from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput/AutocompleteInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './OccupationStatus.module.scss';

const OCCUPATION_STATUS_OPTIONS = [
  'Employed',
  'Self-Employed',
  'Unemployed',
  'Retired',
  'Student',
  'Business Owner',
  'Other',
];

const OccupationStatus = () => {
  const occupationStatus = useWorkFormStore(
    (state) => state.workFormData.occupationStatus,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.occupationStatus,
  );

  const options = useMemo(() => OCCUPATION_STATUS_OPTIONS, []);

  const handleChange = (value: string) => {
    setWorkFormData({ occupationStatus: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Occupation Status<span className={styles.requiredAsterisk}>*</span>
        </label>
        <AutocompleteInput
          value={occupationStatus}
          onChange={handleChange}
          suggestions={options}
          placeholder="Select or type..."
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default OccupationStatus;
