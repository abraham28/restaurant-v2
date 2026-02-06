import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './Occupation.module.scss';

const Occupation = () => {
  const occupation = useWorkFormStore((state) => state.workFormData.occupation);
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.occupation);

  const handleChange = (value: string) => {
    setWorkFormData({ occupation: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Occupation<span className={styles.requiredAsterisk}>*</span>
        </label>
        <TextInput
          value={occupation}
          onChange={handleChange}
          placeholder="Enter occupation"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default Occupation;
