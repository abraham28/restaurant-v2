import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './SourceOfFundWealth.module.scss';

const SourceOfFundWealth = () => {
  const sourceOfFundWealth = useWorkFormStore(
    (state) => state.workFormData.sourceOfFundWealth,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.sourceOfFundWealth,
  );

  const handleChange = (value: string) => {
    setWorkFormData({ sourceOfFundWealth: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Source of Fund / Wealth</label>
        <TextInput
          value={sourceOfFundWealth}
          onChange={handleChange}
          placeholder="Enter source of fund or wealth"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default SourceOfFundWealth;
