import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'atomic-components/Button';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import DatePicker from 'atomic-components/DatePicker';
import NumberInput from 'atomic-components/NumberInput';
import { ROUTES } from 'utils/constants';
import styles from './ClientInformationSystemInsert.module.scss';

type TabType =
  | 'individual'
  | 'contacts'
  | 'documents'
  | 'employment'
  | 'business'
  | 'financial'
  | 'amla'
  | 'remarks'
  | 'picture';

interface FormData {
  // Basic Information
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
  // Relationship
  isBeneficiary: boolean;
  primaryBeneficiary: string;
  // Education
  education: string;
  schoolLevel: string;
  // Dependents
  elementaryDependents: number;
  highSchoolDependents: number;
  collegeDependents: number;
  noOfDependents: number;
  // Cars Owned
  numberOfCarsOwned: number;
}

function ClientInformationSystemInsert() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('individual');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    lastName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    gender: '',
    maritalStatus: '',
    birthDate: '',
    age: 0,
    birthPlace: '',
    nationality: '',
    previousName: '',
    nickName: '',
    bloodType: '',
    weight: 0,
    height: 0,
    isDeceased: false,
    isBeneficiary: false,
    primaryBeneficiary: '',
    education: '',
    schoolLevel: '',
    elementaryDependents: 0,
    highSchoolDependents: 0,
    collegeDependents: 0,
    noOfDependents: 0,
    numberOfCarsOwned: 0,
  });

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | number | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSave = useCallback(() => {
    // Save functionality will be implemented later
    console.log('Save clicked', formData);
  }, [formData]);

  const handleCancel = useCallback(() => {
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT);
  }, [navigate]);

  const calculateAge = useCallback((birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }, []);

  const handleBirthDateChange = useCallback(
    (date: string) => {
      handleInputChange('birthDate', date);
      const age = calculateAge(date);
      handleInputChange('age', age);
    },
    [calculateAge, handleInputChange],
  );

  // Mock data for dropdowns
  const titleOptions = ['MR', 'MRS', 'MS', 'DR', 'ENG', 'ATTY'];
  const suffixOptions = ['JR', 'SR', 'II', 'III', 'IV'];
  const genderOptions = ['Male', 'Female'];
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
  const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const tabs: { id: TabType; label: string }[] = [
    { id: 'individual', label: 'Individual' },
    { id: 'contacts', label: 'Contacts/Addresses/IDs' },
    { id: 'documents', label: 'Documents' },
    { id: 'employment', label: 'Employment' },
    { id: 'business', label: 'Business' },
    { id: 'financial', label: 'Financial' },
    { id: 'amla', label: 'AMLA/Tags' },
    { id: 'remarks', label: 'Remarks/Groupings' },
    { id: 'picture', label: 'Picture/Signature' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Information System - Insert</h1>
        <div className={styles.headerActions}>
          <div className={styles.requiredFields}>
            Required Fields:{' '}
            <span className={styles.requiredText}>CIC AMLA</span>
          </div>
          <div className={styles.buttons}>
            <Button variant="primary" onClick={handleSave}>
              Save <span className={styles.shortcut}>[F4]</span>
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.tabActive : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'individual' && (
          <div className={styles.tabContent}>
            <div className={styles.formGrid}>
              {/* BASIC INFORMATION Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>BASIC INFORMATION</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Title <span className={styles.required}>*</span>
                    </label>
                    <AutocompleteInput
                      value={formData.title}
                      onChange={(value) => handleInputChange('title', value)}
                      suggestions={titleOptions}
                      placeholder="Select title"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Last Name <span className={styles.required}>*</span>
                    </label>
                    <AutocompleteInput
                      value={formData.lastName}
                      onChange={(value) => handleInputChange('lastName', value)}
                      suggestions={[]}
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      First Name <span className={styles.required}>*</span>
                    </label>
                    <AutocompleteInput
                      value={formData.firstName}
                      onChange={(value) =>
                        handleInputChange('firstName', value)
                      }
                      suggestions={[]}
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Middle Name</label>
                    <AutocompleteInput
                      value={formData.middleName}
                      onChange={(value) =>
                        handleInputChange('middleName', value)
                      }
                      suggestions={[]}
                      placeholder="Enter middle name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Suffix</label>
                    <AutocompleteInput
                      value={formData.suffix}
                      onChange={(value) => handleInputChange('suffix', value)}
                      suggestions={suffixOptions}
                      placeholder="Select suffix"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Gender <span className={styles.required}>*</span>
                    </label>
                    <AutocompleteInput
                      value={formData.gender}
                      onChange={(value) => handleInputChange('gender', value)}
                      suggestions={genderOptions}
                      placeholder="Select gender"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Marital Status</label>
                    <AutocompleteInput
                      value={formData.maritalStatus}
                      onChange={(value) =>
                        handleInputChange('maritalStatus', value)
                      }
                      suggestions={maritalStatusOptions}
                      placeholder="Select marital status"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Birthdate <span className={styles.required}>*</span>
                    </label>
                    <DatePicker
                      value={formData.birthDate}
                      onChange={handleBirthDateChange}
                      placeholder="Select birthdate"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Age</label>
                    <input
                      type="text"
                      value={formData.age || ''}
                      readOnly
                      className={styles.readOnlyInput}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Birthplace</label>
                    <input
                      type="text"
                      value={formData.birthPlace}
                      onChange={(e) =>
                        handleInputChange('birthPlace', e.target.value)
                      }
                      className={styles.input}
                      placeholder="Enter birthplace"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Nationality</label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) =>
                        handleInputChange('nationality', e.target.value)
                      }
                      className={styles.input}
                      placeholder="Enter nationality"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Previous Name</label>
                    <input
                      type="text"
                      value={formData.previousName}
                      onChange={(e) =>
                        handleInputChange('previousName', e.target.value)
                      }
                      className={styles.input}
                      placeholder="Enter previous name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Nick Name</label>
                    <input
                      type="text"
                      value={formData.nickName}
                      onChange={(e) =>
                        handleInputChange('nickName', e.target.value)
                      }
                      className={styles.input}
                      placeholder="Enter nick name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Blood Type</label>
                    <AutocompleteInput
                      value={formData.bloodType}
                      onChange={(value) =>
                        handleInputChange('bloodType', value)
                      }
                      suggestions={bloodTypeOptions}
                      placeholder="Select blood type"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Weight (kg)</label>
                    <NumberInput
                      value={formData.weight}
                      onChange={(value) => handleInputChange('weight', value)}
                      placeholder="Enter weight"
                      decimal
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Height (cm)</label>
                    <NumberInput
                      value={formData.height}
                      onChange={(value) => handleInputChange('height', value)}
                      placeholder="Enter height"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.isDeceased}
                        onChange={(e) =>
                          handleInputChange('isDeceased', e.target.checked)
                        }
                        className={styles.checkbox}
                      />
                      Client is Deceased?
                    </label>
                  </div>
                </div>
              </div>

              {/* Relationship Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>RELATIONSHIP</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.isBeneficiary}
                        onChange={(e) =>
                          handleInputChange('isBeneficiary', e.target.checked)
                        }
                        className={styles.checkbox}
                      />
                      This Client is Primary Beneficiary of another client?
                    </label>
                  </div>
                  {formData.isBeneficiary && (
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Primary Beneficiary
                      </label>
                      <AutocompleteInput
                        value={formData.primaryBeneficiary}
                        onChange={(value) =>
                          handleInputChange('primaryBeneficiary', value)
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
                      onChange={(value) =>
                        handleInputChange('education', value)
                      }
                      suggestions={[]}
                      placeholder="Type search"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>School Level</label>
                    <AutocompleteInput
                      value={formData.schoolLevel}
                      onChange={(value) =>
                        handleInputChange('schoolLevel', value)
                      }
                      suggestions={[]}
                      placeholder="Type search"
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
                        handleInputChange('elementaryDependents', value)
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>High School</label>
                    <NumberInput
                      value={formData.highSchoolDependents}
                      onChange={(value) =>
                        handleInputChange('highSchoolDependents', value)
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>College</label>
                    <NumberInput
                      value={formData.collegeDependents}
                      onChange={(value) =>
                        handleInputChange('collegeDependents', value)
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>No. of Dependents</label>
                    <NumberInput
                      value={formData.noOfDependents}
                      onChange={(value) =>
                        handleInputChange('noOfDependents', value)
                      }
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
                      onChange={(value) =>
                        handleInputChange('numberOfCarsOwned', value)
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'individual' && (
          <div className={styles.tabContent}>
            <div className={styles.emptyTab}>
              {tabs.find((t) => t.id === activeTab)?.label} content coming
              soon...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientInformationSystemInsert;
