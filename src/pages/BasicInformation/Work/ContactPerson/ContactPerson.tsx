import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './ContactPerson.module.scss';

const ContactPerson = () => {
  const contactPerson = useWorkFormStore(
    (state) => state.workFormData.contactPerson,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.contactPerson);

  const handleChange = (value: string) => {
    setWorkFormData({ contactPerson: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Contact Person<span className={styles.requiredAsterisk}>*</span>
        </label>
        <TextInput
          value={contactPerson}
          onChange={handleChange}
          placeholder="Enter contact person"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default ContactPerson;
