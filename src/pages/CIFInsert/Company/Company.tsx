import React from 'react';
import { Info, Folder } from 'lucide-react';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import TextInput from 'atomic-components/TextInput/TextInput';
import Radio from 'atomic-components/Radio/Radio';
import DatePicker from 'atomic-components/DatePicker/DatePicker';
import NumberInput from 'atomic-components/NumberInput/NumberInput';
import Button from 'atomic-components/Button';
import styles from '../CIFIndividual.module.scss';

interface CompanyTabProps {
  formData: {
    companyType: string;
    companyName: string;
    registeredName: string;
    tin: string;
    startOfBusiness: string;
    numberOfEmployees: number;
    trader1: string;
    trader2: string;
    firmSize: string;
    conglomerateDomain: string;
    entityLocation: string;
    countryOfOrigin: string;
    placeOfRegistration: string;
    legalForm: string;
    industry: string;
    originOfEntity: string;
    businessActivity: string;
    netTaxableIncome: number;
    monthlyExpenses: number;
    parentClient: string;
    roleOfParent: string;
    contactPerson: string;
    designation: string;
    nationality: string;
  };
  onInputChange: (field: string, value: string | number) => void;
  onDateChange: (field: string, date: string) => void;
  companyTypeOptions: string[];
  firmSizeOptions: string[];
}

function CompanyTab({
  formData,
  onInputChange,
  onDateChange,
  companyTypeOptions,
  firmSizeOptions,
}: CompanyTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.formGrid}>
        {/* BASIC INFORMATION Section - Spans 2 columns */}
        <div className={`${styles.section} ${styles.basicInfoSection}`}>
          <h3 className={styles.sectionTitle}>BASIC INFORMATION</h3>
          <div className={styles.basicInfoGrid}>
            {/* Left Column */}
            <div className={styles.basicInfoColumn}>
              <div className={styles.field}>
                <label className={styles.label}>
                  Company Type
                  <Info size={14} className={styles.infoIcon} />
                </label>
                <Radio
                  value={formData.companyType}
                  onChange={(value) => onInputChange('companyType', value)}
                  options={companyTypeOptions}
                  placeholder="Select company type"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Company Name</label>
                <TextInput
                  value={formData.companyName}
                  onChange={(value) => onInputChange('companyName', value)}
                  placeholder="Enter company name"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Registered Name</label>
                <TextInput
                  value={formData.registeredName}
                  onChange={(value) => onInputChange('registeredName', value)}
                  placeholder="Enter registered name"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>TIN</label>
                <TextInput
                  value={formData.tin}
                  onChange={(value) => onInputChange('tin', value)}
                  placeholder="Enter TIN"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Start of Business</label>
                <DatePicker
                  value={formData.startOfBusiness}
                  onChange={(date) => onDateChange('startOfBusiness', date)}
                  placeholder="Select date"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Number of Employees</label>
                <NumberInput
                  value={formData.numberOfEmployees}
                  onChange={(value) =>
                    onInputChange('numberOfEmployees', value)
                  }
                  placeholder="0"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Trader 1</label>
                <AutocompleteInput
                  value={formData.trader1}
                  onChange={(value) => onInputChange('trader1', value)}
                  suggestions={[]}
                  placeholder="Type to Search"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Trader 2</label>
                <AutocompleteInput
                  value={formData.trader2}
                  onChange={(value) => onInputChange('trader2', value)}
                  suggestions={[]}
                  placeholder="Type to Search"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Firm Size
                  <Info size={14} className={styles.infoIcon} />
                </label>
                <Radio
                  value={formData.firmSize}
                  onChange={(value) => onInputChange('firmSize', value)}
                  options={firmSizeOptions}
                  placeholder="Select firm size"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Conglomerate Domain
                  <Info size={14} className={styles.infoIcon} />
                </label>
                <div className={styles.inputWithIcons}>
                  <TextInput
                    value={formData.conglomerateDomain}
                    onChange={(value) =>
                      onInputChange('conglomerateDomain', value)
                    }
                    placeholder="Enter conglomerate domain"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    iconOnly
                    onClick={() => {}}
                    aria-label="Open conglomerate domain list"
                  >
                    <Folder size={14} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className={styles.basicInfoColumn}>
              <div className={styles.field}>
                <label className={styles.label}>Entity Location</label>
                <AutocompleteInput
                  value={formData.entityLocation}
                  onChange={(value) => onInputChange('entityLocation', value)}
                  suggestions={[]}
                  placeholder="Type to Search"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Country of Origin</label>
                <AutocompleteInput
                  value={formData.countryOfOrigin}
                  onChange={(value) => onInputChange('countryOfOrigin', value)}
                  suggestions={[]}
                  placeholder="Type to Search"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Place of Registration</label>
                <TextInput
                  value={formData.placeOfRegistration}
                  onChange={(value) =>
                    onInputChange('placeOfRegistration', value)
                  }
                  placeholder="Enter place of registration"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Legal Form</label>
                <AutocompleteInput
                  value={formData.legalForm}
                  onChange={(value) => onInputChange('legalForm', value)}
                  suggestions={[]}
                  placeholder="Type to Search"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Industry</label>
                <AutocompleteInput
                  value={formData.industry}
                  onChange={(value) => onInputChange('industry', value)}
                  suggestions={[]}
                  placeholder="Type to Search"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Origin of Entity</label>
                <TextInput
                  value={formData.originOfEntity}
                  onChange={(value) => onInputChange('originOfEntity', value)}
                  placeholder="Enter origin of entity"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Business Activity</label>
                <AutocompleteInput
                  value={formData.businessActivity}
                  onChange={(value) => onInputChange('businessActivity', value)}
                  suggestions={[]}
                  placeholder="Type to Search"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Net Taxable Income</label>
                <NumberInput
                  value={formData.netTaxableIncome}
                  onChange={(value) => onInputChange('netTaxableIncome', value)}
                  placeholder="0.00"
                  decimal
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Monthly Expenses</label>
                <NumberInput
                  value={formData.monthlyExpenses}
                  onChange={(value) => onInputChange('monthlyExpenses', value)}
                  placeholder="0.00"
                  decimal
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ownership Information Section - Right Column */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Ownership Information</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Parent Client</label>
              <AutocompleteInput
                value={formData.parentClient}
                onChange={(value) => onInputChange('parentClient', value)}
                suggestions={[]}
                placeholder="Type to Search"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Role of Parent</label>
              <TextInput
                value={formData.roleOfParent}
                onChange={(value) => onInputChange('roleOfParent', value)}
                placeholder="Enter role of parent"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Contact Person
                <Info size={14} className={styles.infoIcon} />
              </label>
              <TextInput
                value={formData.contactPerson}
                onChange={(value) => onInputChange('contactPerson', value)}
                placeholder="Enter contact person"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Designation</label>
              <TextInput
                value={formData.designation}
                onChange={(value) => onInputChange('designation', value)}
                placeholder="Enter designation"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Nationality</label>
              <AutocompleteInput
                value={formData.nationality}
                onChange={(value) => onInputChange('nationality', value)}
                suggestions={[]}
                placeholder="Type to Search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyTab;
