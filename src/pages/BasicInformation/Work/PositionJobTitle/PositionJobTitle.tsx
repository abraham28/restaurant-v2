import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './PositionJobTitle.module.scss';

const PositionJobTitle = () => {
  const positionJobTitle = useWorkFormStore(
    (state) => state.workFormData.positionJobTitle,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.positionJobTitle,
  );

  const handleChange = (value: string) => {
    setWorkFormData({ positionJobTitle: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>
          Position / Job Title<span className={styles.requiredAsterisk}>*</span>
        </label>
        <TextInput
          value={positionJobTitle}
          onChange={handleChange}
          placeholder="Enter position or job title"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default PositionJobTitle;
