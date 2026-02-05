import TextInput from 'atomic-components/TextInput/TextInput';
import { useClientFormStore } from 'stores/clientFormStore';
import styles from './MiddleName.module.scss';

const MiddleName = () => {
  const middleName = useClientFormStore((state) => state.formData.middleName);
  const setFormData = useClientFormStore((state) => state.setFormData);

  const handleChange = (value: string) => {
    setFormData({ middleName: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Middle Name</label>
        <TextInput
          value={middleName}
          onChange={handleChange}
          placeholder="Enter middle name"
        />
      </div>
    </div>
  );
};

export default MiddleName;
