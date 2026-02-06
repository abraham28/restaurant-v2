import Textarea from 'atomic-components/Textarea/Textarea';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './Address.module.scss';

const Address = () => {
  const address = useWorkFormStore((state) => state.workFormData.address);
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.address);

  const handleChange = (value: string) => {
    setWorkFormData({ address: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Address<span className={styles.requiredAsterisk}>*</span>
        </label>
        <Textarea
          value={address}
          onChange={handleChange}
          placeholder="Enter address"
          rows={3}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default Address;
