import TextInput from 'atomic-components/TextInput/TextInput';
import { useIndividualStore } from 'stores/IndividualStore';
import styles from './LastName.module.scss';
const LastName = () => {
  const lastName = useIndividualStore((state) => state.formData.lastName);
  const setFormData = useIndividualStore((state) => state.setFormData);

  const handleChange = (value: string) => {
    setFormData({ lastName: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Last Name</label>
        <TextInput
          value={lastName}
          onChange={handleChange}
          placeholder="Enter last name"
        />
      </div>
    </div>
  );
};

export default LastName;
