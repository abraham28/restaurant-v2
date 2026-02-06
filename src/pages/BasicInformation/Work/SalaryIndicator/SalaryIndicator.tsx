import React, { useMemo } from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput/AutocompleteInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './SalaryIndicator.module.scss';

const SALARY_INDICATOR_OPTIONS = [
  'Monthly',
  'Daily',
  'Weekly',
  'Bi-weekly',
  'Quarterly',
  'Annually',
  'Other',
];

const SalaryIndicator = () => {
  const salaryIndicator = useWorkFormStore(
    (state) => state.workFormData.salaryIndicator,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.salaryIndicator,
  );

  const options = useMemo(() => SALARY_INDICATOR_OPTIONS, []);

  const handleChange = (value: string) => {
    setWorkFormData({ salaryIndicator: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Salary Indicator
          <span className={styles.requiredAsterisk}>*</span>
        </label>
        <AutocompleteInput
          value={salaryIndicator}
          onChange={handleChange}
          suggestions={options}
          placeholder="e.g. Monthly, Daily or type custom"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default SalaryIndicator;
