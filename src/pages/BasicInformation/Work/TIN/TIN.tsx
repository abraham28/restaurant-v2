import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './TIN.module.scss';

const TIN = () => {
  const tin = useWorkFormStore((state) => state.workFormData.tin);
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.tin);

  const handleChange = (value: string) => {
    setWorkFormData({ tin: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>TIN</label>
        <TextInput
          value={tin}
          onChange={handleChange}
          placeholder="Enter TIN"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default TIN;
