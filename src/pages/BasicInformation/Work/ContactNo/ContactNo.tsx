import PhoneNumberInput from 'atomic-components/PhoneNumberInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './ContactNo.module.scss';

const ContactNo = () => {
  const contactNo = useWorkFormStore((state) => state.workFormData.contactNo);
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore((state) => state.workFormErrors.contactNo);

  const handleChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    setWorkFormData({ contactNo: digits ? value : '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Contact No.<span className={styles.requiredAsterisk}>*</span>
        </label>
        <PhoneNumberInput
          value={contactNo}
          onChange={handleChange}
          placeholder="+63 9** *** ****"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default ContactNo;
