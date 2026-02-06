import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './EmployerBusinessActivity.module.scss';

const EmployerBusinessActivity = () => {
  const employerBusinessActivity = useWorkFormStore(
    (state) => state.workFormData.employerBusinessActivity,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.employerBusinessActivity,
  );

  const handleChange = (value: string) => {
    setWorkFormData({ employerBusinessActivity: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Employer Business Activity</label>
        <TextInput
          value={employerBusinessActivity}
          onChange={handleChange}
          placeholder="Enter employer business activity"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default EmployerBusinessActivity;
