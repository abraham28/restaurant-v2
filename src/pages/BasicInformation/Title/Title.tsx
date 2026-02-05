import React, { useMemo } from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput/AutocompleteInput';
import { useClientFormStore } from 'stores/clientFormStore';
import titleData from 'data/cisTitle.json';
import styles from './Title.module.scss';

const Title = () => {
  const title = useClientFormStore((state) => state.formData.title);
  const setFormData = useClientFormStore((state) => state.setFormData);

  const titleOptions = useMemo(
    () =>
      (titleData as Array<{ TitleID: string; Description: string }>).map(
        (t) => t.Description,
      ),
    [],
  );

  const handleChange = (value: string) => {
    setFormData({ title: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <label className={styles.label}>Title</label>
        <AutocompleteInput
          value={title}
          onChange={handleChange}
          suggestions={titleOptions}
          placeholder="Type to search..."
        />
      </div>
    </div>
  );
};

export default Title;
