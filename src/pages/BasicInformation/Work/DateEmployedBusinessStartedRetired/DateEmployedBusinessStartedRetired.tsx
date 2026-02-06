import BirthdateInput from 'atomic-components/BirthdateInput/BirthdateInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './DateEmployedBusinessStartedRetired.module.scss';

const DateEmployedBusinessStartedRetired = () => {
  const dateEmployedBusinessStartedRetired = useWorkFormStore(
    (state) => state.workFormData.dateEmployedBusinessStartedRetired,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.dateEmployedBusinessStartedRetired,
  );

  const handleChange = (value: string) => {
    setWorkFormData({ dateEmployedBusinessStartedRetired: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Date Employed / Business Started / Retired
          <span className={styles.requiredAsterisk}>*</span>
        </label>
        <div className={styles.inputWrapper}>
          <BirthdateInput
            value={dateEmployedBusinessStartedRetired}
            onChange={handleChange}
            placeholder="Select date"
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default DateEmployedBusinessStartedRetired;
