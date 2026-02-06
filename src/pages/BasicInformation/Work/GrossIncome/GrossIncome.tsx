import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './GrossIncome.module.scss';

const GrossIncome = () => {
  const grossIncome = useWorkFormStore(
    (state) => state.workFormData.grossIncome,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.grossIncome);

  const handleChange = (value: string) => {
    setWorkFormData({ grossIncome: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Gross Income<span className={styles.requiredAsterisk}>*</span>
        </label>
        <TextInput
          type="number"
          value={grossIncome}
          onChange={handleChange}
          placeholder="Enter gross income"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default GrossIncome;
