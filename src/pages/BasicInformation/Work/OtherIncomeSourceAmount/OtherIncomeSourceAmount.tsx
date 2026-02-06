import TextInput from 'atomic-components/TextInput/TextInput';
import { useWorkFormStore } from 'stores/WorkFormStore';
import styles from './OtherIncomeSourceAmount.module.scss';

const OtherIncomeSourceAmount = () => {
  const otherIncomeSourceAmount = useWorkFormStore(
    (state) => state.workFormData.otherIncomeSourceAmount,
  );
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const error = useWorkFormStore(
    (state) => state.workFormErrors.otherIncomeSourceAmount,
  );

  const handleChange = (value: string) => {
    setWorkFormData({ otherIncomeSourceAmount: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Other Income Source Amount</label>
        <TextInput
          type="number"
          value={otherIncomeSourceAmount}
          onChange={handleChange}
          placeholder="Enter amount"
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default OtherIncomeSourceAmount;
