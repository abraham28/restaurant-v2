import React from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import TextInput from 'atomic-components/TextInput/TextInput';
import Radio from 'atomic-components/Radio/Radio';
import DatePicker from 'atomic-components/DatePicker/DatePicker';
import styles from '../CIFOrganization.module.scss';
import RequiredFieldBullet from 'atomic-components/RequiredFieldBullet/RequiredFieldBullet';

interface FormData {
  group1: string;
  group2: string;
  group3: string;
  customUse1: string;
  customUse2: string;
  customUse3: string;
  customUse4: string;
  remarks: string;
  clientStatus: string;
  memberSinceDate: string;
  lastClientUpdate: string;
}

interface RemarksTabProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: string | number | boolean,
  ) => void;
  clientStatusOptions: string[];
}

function RemarksTab({
  formData,
  onInputChange,
  clientStatusOptions,
}: RemarksTabProps) {
  const handleDateChange = (field: 'memberSinceDate' | 'lastClientUpdate') => {
    return (date: string) => {
      onInputChange(field, date);
    };
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.remarksGrid}>
        {/* Left Column: Groupings and Remarks */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>GROUPINGS</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Group 1</label>
              <AutocompleteInput
                value={formData.group1}
                onChange={(value) => onInputChange('group1', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Group 2</label>
              <AutocompleteInput
                value={formData.group2}
                onChange={(value) => onInputChange('group2', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Group 3</label>
              <AutocompleteInput
                value={formData.group3}
                onChange={(value) => onInputChange('group3', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Custom Use 1</label>
              <AutocompleteInput
                value={formData.customUse1}
                onChange={(value) => onInputChange('customUse1', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Custom Use 2</label>
              <AutocompleteInput
                value={formData.customUse2}
                onChange={(value) => onInputChange('customUse2', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Custom Use 3</label>
              <AutocompleteInput
                value={formData.customUse3}
                onChange={(value) => onInputChange('customUse3', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Custom Use 4</label>
              <AutocompleteInput
                value={formData.customUse4}
                onChange={(value) => onInputChange('customUse4', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>
          </div>

          <div className={styles.subsection}>
            <h4 className={styles.subsectionTitle}>Remarks</h4>
            <div className={styles.field}>
              <TextInput
                value={formData.remarks}
                onChange={(value) => onInputChange('remarks', value)}
                placeholder="Type Remarks"
              />
            </div>
          </div>
        </div>

        {/* Right Column: General Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>GENERAL</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                Client Status
                <RequiredFieldBullet /> <RequiredFieldBullet type="amla" />
              </label>
              <Radio
                value={formData.clientStatus}
                onChange={(value) => onInputChange('clientStatus', value)}
                options={clientStatusOptions}
                placeholder="Select client status"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Member Since Date</label>
              <DatePicker
                value={formData.memberSinceDate}
                onChange={handleDateChange('memberSinceDate')}
                placeholder="Select date"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Last Client Update</label>
              <DatePicker
                value={formData.lastClientUpdate}
                onChange={handleDateChange('lastClientUpdate')}
                placeholder="Select date"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemarksTab;
