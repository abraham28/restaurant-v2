import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './OtherIncomeSource.module.scss';

const OtherIncomeSource = () => {
  const otherIncomeSource = useWorkFormStore(
    (state) => state.workFormData.otherIncomeSource,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.otherIncomeSource,
  );

  const handleChange = (value: string) => {
    setWorkFormData({ otherIncomeSource: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Other Income Source</label>
        <TextInput
          value={otherIncomeSource}
          onChange={handleChange}
          placeholder="Enter other income source"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default OtherIncomeSource;
