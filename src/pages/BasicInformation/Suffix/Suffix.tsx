import React, { useMemo } from 'react';
import SelectDropdown from 'atomic-components/SelectDropdown/SelectDropdown';
import { useClientFormStore } from 'stores/clientFormStore';
import suffixData from 'data/cisClientNameSuffix.json';
import styles from './Suffix.module.scss';

const Suffix = () => {
  const suffix = useClientFormStore((state) => state.formData.suffix);
  const setFormData = useClientFormStore((state) => state.setFormData);

  const suffixOptions = useMemo(
    () =>
      (suffixData as Array<{ SuffixID: string; Suffix: string }>).map(
        (s) => s.Suffix,
      ),
    [],
  );

  const handleChange = (value: string) => {
    setFormData({ suffix: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Suffix</label>
        <SelectDropdown
          value={suffix}
          onChange={handleChange}
          options={suffixOptions}
          placeholder=""
        />
      </div>
    </div>
  );
};

export default Suffix;
