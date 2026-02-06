import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './EmployerName.module.scss';

const EmployerName = () => {
  const employerName = useWorkFormStore(
    (state) => state.workFormData.employerName,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.employerName);

  const handleChange = (value: string) => {
    setWorkFormData({ employerName: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Employer Name<span className={styles.requiredAsterisk}>*</span>
        </label>
        <TextInput
          value={employerName}
          onChange={handleChange}
          placeholder="Enter employer name"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default EmployerName;
