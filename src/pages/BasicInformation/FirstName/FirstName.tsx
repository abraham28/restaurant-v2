import TextInput from 'atomic-components/TextInput/TextInput';
import { useClientFormStore } from 'stores/clientFormStore';
import styles from './FirstName.module.scss';

const FirstName = () => {
  const firstName = useClientFormStore((state) => state.formData.firstName);
  const setFormData = useClientFormStore((state) => state.setFormData);

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
