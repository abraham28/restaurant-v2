import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './Salary.module.scss';

const Salary = () => {
  const salary = useWorkFormStore((state) => state.workFormData.salary);
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.salary);

  const handleChange = (value: string) => {
    setWorkFormData({ salary: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Salary<span className={styles.requiredAsterisk}>*</span>
        </label>
        <TextInput
          type="number"
          value={salary}
          onChange={handleChange}
          placeholder="Enter salary"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default Salary;
