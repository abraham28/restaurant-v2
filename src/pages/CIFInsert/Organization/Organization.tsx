import React from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import TextInput from 'atomic-components/TextInput/TextInput';
import DatePicker from 'atomic-components/DatePicker/DatePicker';
import styles from '../CIFIndividual.module.scss';

interface OrganizationTabProps {
  formData: {
    companyName: string;
    tin: string;
    startOfBusiness: string;
    contactPerson: string;
    designation: string;
    remarks: string;
    countryOfOrigin: string;
    entityLocation: string;
    legalForm: string;
    businessActivity: string;
    nationality: string;
    originOfEntity: string;
    placeOfRegistration: string;
  };
  onInputChange: (field: string, value: string | number) => void;
  onDateChange: (field: string, date: string) => void;
  companyTypeOptions: string[];
  firmSizeOptions: string[];
}

function OrganizationTab({
  formData,
  onInputChange,
  onDateChange,
}: OrganizationTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.formGrid}>
        {/* BASIC INFORMATION Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>BASIC INFORMATION</h3>
          <div className={styles.organizationFieldsGrid}>
            {/* Left Column */}
            <div className={styles.organizationColumn}>
              <div className={styles.field}>
                <label className={styles.label}>Name:</label>
                <TextInput
                  value={formData.companyName}
                  onChange={(value) => onInputChange('companyName', value)}
                  placeholder="Enter name"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>TIN:</label>
                <TextInput
                  value={formData.tin}
                  onChange={(value) => onInputChange('tin', value)}
                  placeholder="Enter TIN"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Date Established:</label>
                <DatePicker
                  value={formData.startOfBusiness}
                  onChange={(date) => onDateChange('startOfBusiness', date)}
                  placeholder="Select date"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Contact Person:</label>
                <TextInput
                  value={formData.contactPerson}
                  onChange={(value) => onInputChange('contactPerson', value)}
                  placeholder="Enter contact person"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Designation:</label>
                <TextInput
                  value={formData.designation}
                  onChange={(value) => onInputChange('designation', value)}
                  placeholder="Enter designation"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Remarks / Reference(s):</label>
                <TextInput
                  value={formData.remarks}
                  onChange={(value) => onInputChange('remarks', value)}
                  placeholder="Type Remarks"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.organizationColumn}>
              <div className={styles.field}>
                <label className={styles.label}>Country of Origin:</label>
                <AutocompleteInput
                  value={formData.countryOfOrigin}
                  onChange={(value) => onInputChange('countryOfOrigin', value)}
                  suggestions={[]}
                  placeholder="Type to Search."
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Location of Entity:</label>
                <AutocompleteInput
                  value={formData.entityLocation}
                  onChange={(value) => onInputChange('entityLocation', value)}
                  suggestions={[]}
                  placeholder="Type to Search."
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Legal Form:</label>
                <AutocompleteInput
                  value={formData.legalForm}
                  onChange={(value) => onInputChange('legalForm', value)}
                  suggestions={[]}
                  placeholder="Type to Search."
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Business Activity:</label>
                <AutocompleteInput
                  value={formData.businessActivity}
                  onChange={(value) => onInputChange('businessActivity', value)}
                  suggestions={[]}
                  placeholder="Type to Search."
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Nationality:</label>
                <AutocompleteInput
                  value={formData.nationality}
                  onChange={(value) => onInputChange('nationality', value)}
                  suggestions={[]}
                  placeholder="Type to Search."
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Origin of Entity:</label>
                <TextInput
                  value={formData.originOfEntity}
                  onChange={(value) => onInputChange('originOfEntity', value)}
                  placeholder="Enter origin of entity"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Place of Registration:</label>
                <TextInput
                  value={formData.placeOfRegistration}
                  onChange={(value) =>
                    onInputChange('placeOfRegistration', value)
                  }
                  placeholder="Enter place of registration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationTab;
