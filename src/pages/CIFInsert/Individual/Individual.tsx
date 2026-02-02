import React from 'react';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import TextInput from 'atomic-components/TextInput/TextInput';
import NameInput from 'atomic-components/NameInput/NameInput';
import Radio from 'atomic-components/Radio/Radio';
import Checkbox from 'atomic-components/Checkbox/Checkbox';
import BirthdateInput from 'atomic-components/BirthdateInput/BirthdateInput';
import NumberInput from 'atomic-components/NumberInput/NumberInput';
import AgeInput from 'atomic-components/AgeInput/AgeInput';
import RequiredFieldBullet from 'atomic-components/RequiredFieldBullet/RequiredFieldBullet';
import Button from 'atomic-components/Button';
import styles from '../CIFIndividual.module.scss';

interface FormData {
  title: string;
  lastName: string;
  firstName: string;
  middleName: string;
  suffix: string;
  gender: string;
  maritalStatus: string;
  birthDate: string;
  age: number;
  birthPlace: string;
  nationality: string;
  previousName: string;
  nickName: string;
  bloodType: string;
  weight: number;
  height: number;
  isDeceased: boolean;
  isBeneficiary: boolean;
  primaryBeneficiary: string;
  education: string;
  schoolLevel: string;
  elementaryDependents: number;
  highSchoolDependents: number;
  collegeDependents: number;
  noOfDependents: number;
  numberOfCarsOwned: number;
}

interface IndividualTabProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: string | number | boolean,
  ) => void;
  onBirthDateChange: (date: string) => void;
  titleOptions: string[];
  suffixOptions: string[];
  genderOptions: string[];
  maritalStatusOptions: string[];
  bloodTypeOptions: string[];
}

function IndividualTab({
  formData,
  onInputChange,
  onBirthDateChange,
  titleOptions,
  suffixOptions,
  genderOptions,
  maritalStatusOptions,
  bloodTypeOptions,
}: IndividualTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.formGrid}>
        {/* BASIC INFORMATION Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>BASIC INFORMATION</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                Title <RequiredFieldBullet />
              </label>
              <Radio
                value={formData.title}
                onChange={(value) => onInputChange('title', value)}
                options={titleOptions}
                placeholder="Select title"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Last Name <RequiredFieldBullet />{' '}
                <RequiredFieldBullet type="amla" />
              </label>
              <NameInput
                value={formData.lastName}
                onChange={(value) => onInputChange('lastName', value)}
                placeholder="Enter last name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                First Name <RequiredFieldBullet />{' '}
                <RequiredFieldBullet type="amla" />
              </label>
              <NameInput
                value={formData.firstName}
                onChange={(value) => onInputChange('firstName', value)}
                placeholder="Enter first name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Middle Name <RequiredFieldBullet />{' '}
                <RequiredFieldBullet type="amla" />
              </label>
              <NameInput
                value={formData.middleName}
                onChange={(value) => onInputChange('middleName', value)}
                placeholder="Enter middle name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Suffix</label>
              <Radio
                value={formData.suffix}
                onChange={(value) => onInputChange('suffix', value)}
                options={suffixOptions}
                placeholder="Select suffix"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Gender <RequiredFieldBullet />
              </label>
              <Radio
                value={formData.gender}
                onChange={(value) => onInputChange('gender', value)}
                options={genderOptions}
                placeholder="Select gender"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Marital Status <RequiredFieldBullet />
              </label>
              <Radio
                value={formData.maritalStatus}
                onChange={(value) => onInputChange('maritalStatus', value)}
                options={maritalStatusOptions}
                placeholder="Select marital status"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Birthdate <RequiredFieldBullet />{' '}
                <RequiredFieldBullet type="amla" />
              </label>
              <BirthdateInput
                value={formData.birthDate}
                onChange={onBirthDateChange}
                placeholder="Select birthdate"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Age</label>
              <AgeInput value={formData.age} placeholder="Age" />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Birthplace</label>
              <AutocompleteInput
                value={formData.birthPlace}
                onChange={(value) => onInputChange('birthPlace', value)}
                suggestions={[]}
                placeholder="Enter birthplace"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Nationality <RequiredFieldBullet />{' '}
                <RequiredFieldBullet type="amla" />
              </label>
              <AutocompleteInput
                value={formData.nationality}
                onChange={(value) => onInputChange('nationality', value)}
                suggestions={[]}
                placeholder="Enter nationality"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Previous Name</label>
              <NameInput
                value={formData.previousName}
                onChange={(value) => onInputChange('previousName', value)}
                placeholder="Enter previous name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Nick Name</label>
              <NameInput
                value={formData.nickName}
                onChange={(value) => onInputChange('nickName', value)}
                placeholder="Enter nick name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Blood Type</label>
              <Radio
                value={formData.bloodType}
                onChange={(value) => onInputChange('bloodType', value)}
                options={bloodTypeOptions}
                placeholder="Select blood type"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Weight (kg)</label>
              <NumberInput
                value={formData.weight}
                onChange={(value) => onInputChange('weight', value)}
                placeholder="Enter weight"
                decimal
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Height (cm)</label>
              <NumberInput
                value={formData.height}
                onChange={(value) => onInputChange('height', value)}
                placeholder="Enter height"
              />
            </div>

            <div className={styles.field}>
              <Checkbox
                checked={formData.isDeceased}
                onChange={(checked) => onInputChange('isDeceased', checked)}
                label="Client is Deceased?"
              />
            </div>
          </div>
        </div>

        {/* Relationship Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>RELATIONSHIP</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isBeneficiary}
                onChange={(checked) => onInputChange('isBeneficiary', checked)}
                label="This Client is Primary Beneficiary of another client?"
              />
            </div>
            {formData.isBeneficiary && (
              <div className={styles.field}>
                <label className={styles.label}>
                  Primary Beneficiary
                  <Button>+</Button>
                </label>
                <AutocompleteInput
                  value={formData.primaryBeneficiary}
                  onChange={(value) =>
                    onInputChange('primaryBeneficiary', value)
                  }
                  suggestions={[]}
                  placeholder="Type search"
                />
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>EDUCATION</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Education</label>
              <AutocompleteInput
                value={formData.education}
                onChange={(value) => onInputChange('education', value)}
                suggestions={[]}
                placeholder="Type search"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>School Level</label>
              <TextInput
                value={formData.schoolLevel}
                onChange={(value) => onInputChange('schoolLevel', value)}
                placeholder="Enter school level"
              />
            </div>
          </div>
        </div>

        {/* Dependents Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>DEPENDENTS</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Elementary</label>
              <NumberInput
                value={formData.elementaryDependents}
                onChange={(value) =>
                  onInputChange('elementaryDependents', value)
                }
                placeholder="0"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>High School</label>
              <NumberInput
                value={formData.highSchoolDependents}
                onChange={(value) =>
                  onInputChange('highSchoolDependents', value)
                }
                placeholder="0"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>College</label>
              <NumberInput
                value={formData.collegeDependents}
                onChange={(value) => onInputChange('collegeDependents', value)}
                placeholder="0"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>No. of Dependents</label>
              <NumberInput
                value={formData.noOfDependents}
                onChange={(value) => onInputChange('noOfDependents', value)}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Cars Owned Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>CARS OWNED</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>No. of Cars Owned</label>
              <NumberInput
                value={formData.numberOfCarsOwned}
                onChange={(value) => onInputChange('numberOfCarsOwned', value)}
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualTab;
