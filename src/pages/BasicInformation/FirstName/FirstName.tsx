import TextInput from 'atomic-components/TextInput/TextInput';
import { useIndividualStore } from 'stores/IndividualStore';
import styles from './FirstName.module.scss';

const FirstName = () => {
  const firstName = useIndividualStore((state) => state.formData.firstName);
  const setFormData = useIndividualStore((state) => state.setFormData);

  const handleChange = (value: string) => {
    setFormData({ firstName: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>First Name</label>
        <TextInput
          value={firstName}
          onChange={handleChange}
          placeholder="Enter first name"
        />
      </div>
    </div>
  );
};

export default FirstName;
