import TextInput from 'atomic-components/TextInput/TextInput';
import { useIndividualStore } from 'stores/IndividualStore';
import styles from './MiddleName.module.scss';

const MiddleName = () => {
  const middleName = useIndividualStore((state) => state.formData.middleName);
  const setFormData = useIndividualStore((state) => state.setFormData);

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
