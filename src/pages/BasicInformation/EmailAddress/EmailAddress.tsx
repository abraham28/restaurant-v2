import TextInput from 'atomic-components/TextInput/TextInput';
import { useClientFormStore } from 'stores/clientFormStore';
import styles from './EmailAddress.module.scss';

const EmailAddress = () => {
  const emailAddress = useClientFormStore(
    (state) => state.formData.emailAddress,
  );
  const setFormData = useClientFormStore((state) => state.setFormData);

  const handleChange = (value: string) => {
    setFormData({ emailAddress: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Email Address</label>
        <TextInput
          value={emailAddress}
          onChange={handleChange}
          placeholder="Enter email address"
        />
      </div>
    </div>
  );
};

export default EmailAddress;
