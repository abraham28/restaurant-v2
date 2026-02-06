import React, { useMemo } from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput/AutocompleteInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './EmployerIndustry.module.scss';

const INDUSTRY_OPTIONS = [
  'Agriculture',
  'Banking & Finance',
  'Construction',
  'Education',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Technology',
  'Transportation',
  'Government',
  'Other',
];

const EmployerIndustry = () => {
  const employerIndustry = useWorkFormStore(
    (state) => state.workFormData.employerIndustry,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.employerIndustry,
  );

  const options = useMemo(() => INDUSTRY_OPTIONS, []);

  const handleChange = (value: string) => {
    setWorkFormData({ employerIndustry: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Employer Industry<span className={styles.requiredAsterisk}>*</span>
        </label>
        <AutocompleteInput
          value={employerIndustry}
          onChange={handleChange}
          suggestions={options}
          placeholder="Select or type..."
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default EmployerIndustry;
