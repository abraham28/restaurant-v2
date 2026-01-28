import React from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import TextInput from 'atomic-components/TextInput/TextInput';
import DatePicker from 'atomic-components/DatePicker/DatePicker';
import NumberInput from 'atomic-components/NumberInput/NumberInput';
import styles from '../CIFGovernment.module.scss';

interface FormData {
  employeeID: string;
  occupation: string;
  status: string;
  position: string;
  inclusiveDate: string;
  startDate: string;
  endDate: string;
  lengthOfService: number;
  companyEmployerName: string;
  employerTIN: string;
  employerAddress: string;
  employerContactPerson: string;
  employerContactNo: string;
  businessActivities: string;
  industry: string;
}

interface EmploymentTabProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: string | number | boolean,
  ) => void;
}

function EmploymentTab({ formData, onInputChange }: EmploymentTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>EMPLOYMENT INFORMATION</h3>
        <div className={styles.employmentGrid}>
          {/* Left Column */}
          <div className={styles.employmentColumn}>
            <div className={styles.field}>
              <label className={styles.label}>Employee ID</label>
              <TextInput
                value={formData.employeeID}
                onChange={(value) => onInputChange('employeeID', value)}
                placeholder="Enter employee ID"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Occupation</label>
              <TextInput
                value={formData.occupation}
                onChange={(value) => onInputChange('occupation', value)}
                placeholder="Enter occupation"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <AutocompleteInput
                value={formData.status}
                onChange={(value) => onInputChange('status', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Position</label>
              <AutocompleteInput
                value={formData.position}
                onChange={(value) => onInputChange('position', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Inclusive Date</label>
              <DatePicker
                value={formData.inclusiveDate}
                onChange={(value) => onInputChange('inclusiveDate', value)}
                placeholder="Select the date"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Start Date</label>
              <DatePicker
                value={formData.startDate}
                onChange={(value) => onInputChange('startDate', value)}
                placeholder="Select the date"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>End Date</label>
              <DatePicker
                value={formData.endDate}
                onChange={(value) => onInputChange('endDate', value)}
                placeholder="Select the date"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Length of Service</label>
              <NumberInput
                value={formData.lengthOfService}
                onChange={(value) => onInputChange('lengthOfService', value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.employmentColumn}>
            <div className={styles.field}>
              <label className={styles.label}>Company/Employer Name</label>
              <TextInput
                value={formData.companyEmployerName}
                onChange={(value) =>
                  onInputChange('companyEmployerName', value)
                }
                placeholder="Enter company/employer name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Employer TIN</label>
              <TextInput
                value={formData.employerTIN}
                onChange={(value) => onInputChange('employerTIN', value)}
                placeholder="Enter employer TIN"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Employer Address</label>
              <TextInput
                value={formData.employerAddress}
                onChange={(value) => onInputChange('employerAddress', value)}
                placeholder="Enter employer address"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Employer Contact Person</label>
              <TextInput
                value={formData.employerContactPerson}
                onChange={(value) =>
                  onInputChange('employerContactPerson', value)
                }
                placeholder="Enter employer contact person"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Employer Contact No.</label>
              <TextInput
                value={formData.employerContactNo}
                onChange={(value) => onInputChange('employerContactNo', value)}
                placeholder="Enter employer contact number"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Business Activities</label>
              <AutocompleteInput
                value={formData.businessActivities}
                onChange={(value) => onInputChange('businessActivities', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Industry</label>
              <AutocompleteInput
                value={formData.industry}
                onChange={(value) => onInputChange('industry', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmploymentTab;
