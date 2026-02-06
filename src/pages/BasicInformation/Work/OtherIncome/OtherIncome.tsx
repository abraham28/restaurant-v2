import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './OtherIncome.module.scss';

const OtherIncome = () => {
  const otherIncome = useWorkFormStore(
    (state) => state.workFormData.otherIncome,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.otherIncome);

  const handleChange = (value: string) => {
    setWorkFormData({ otherIncome: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Other Income</label>
        <TextInput
          value={otherIncome}
          onChange={handleChange}
          placeholder="Enter other income"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default OtherIncome;
