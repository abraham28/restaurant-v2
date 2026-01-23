import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {
  Grid3x3,
  CreditCard,
  Phone,
  User,
  FileText,
  Info,
  Folder,
} from 'lucide-react';
import Button from 'atomic-components/Button';
import ListButton from 'atomic-components/ListButton';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import TextInput from 'atomic-components/TextInput';
import Textarea from 'atomic-components/Textarea';
import NameInput from 'atomic-components/NameInput';
import Radio from 'atomic-components/Radio';
import Checkbox from 'atomic-components/Checkbox';
import BirthdateInput from 'atomic-components/BirthdateInput';
import DatePicker from 'atomic-components/DatePicker';
import NumberInput from 'atomic-components/NumberInput';
import RequiredFieldBullet from 'atomic-components/RequiredFieldBullet';
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
  // Addresses
  address1Used: string;
  address2Used: string;
  // Primary ID
  primaryID1: string;
  primaryID2: string;
  primaryID3: string;
  // Secondary ID
  secondaryID1: string;
  secondaryID2: string;
  secondaryID3: string;
  // Contacts
  primaryContact: string;
  secondaryContact: string;
  // For AMLA
  presentedIDType: string;
  idNoPresentedForAMLA: string;
  // Mobile Banking
  countryCode: string;
  mobileNumber: string;
  emailAddress: string;
  // Documents
  insufficientInformation: boolean;
  insufficientInformationRemarks: string;
  insufficientDocuments: boolean;
  insufficientDocumentsRemarks: string;
  // Employment
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
  // Business Information
  businessName: string;
  businessActivity: string;
  businessMainAddress: string;
  businessAdditionalAddress: string;
  businessID1: string;
  businessID2: string;
  businessPrimaryContact: string;
  businessSecondaryContact: string;
  // Other Business Information
  otherBusinessName: string;
  otherBusinessActivity: string;
  otherBusinessMainAddress: string;
  otherBusinessAdditionalAddress: string;
  otherBusinessID1: string;
  otherBusinessID2: string;
  otherBusinessPrimaryContact: string;
  otherBusinessSecondaryContact: string;
  // Financial Information
  salaryIndicator: string;
  fundSource: string;
  salary: number;
  grossIncome: number;
  otherIncome: number;
  otherIncomeSource: string;
  otherIncomeSourceAmount: number;
  monthlyAverageIncome: number;
  isLargeExposure: boolean;
  // Loans
  isMicrofinanceBorrower: boolean;
  isRegularLoanBorrower: boolean;
  isComaker: boolean;
  // Savings
  isSavingsAcctDepositor: boolean;
  isCurrentAcctDepositor: boolean;
  // Time Deposit
  isTimeDepositDepositor: boolean;
  isSpecialSavingsDepositor: boolean;
  // Credit Line
  enforceCreditLimit: boolean;
  originalBalance: number;
  outstandingBalance: number;
  // Daily OTC IBFT Limit Amount
  pesonet: number;
  instapay: number;
  mobileWallet: number;
}

function ClientInformationSystemInsert() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('individual');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
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
    address1Used: '',
    address2Used: '',
    primaryID1: '',
    primaryID2: '',
    primaryID3: '',
    secondaryID1: '',
    secondaryID2: '',
    secondaryID3: '',
    primaryContact: '',
    secondaryContact: '',
    presentedIDType: '',
    idNoPresentedForAMLA: '',
    countryCode: '+63',
    mobileNumber: '',
    emailAddress: '',
    insufficientInformation: false,
    insufficientInformationRemarks: '',
    insufficientDocuments: false,
    insufficientDocumentsRemarks: '',
    employeeID: '',
    occupation: '',
    status: '',
    position: '',
    inclusiveDate: '',
    startDate: '',
    endDate: '',
    lengthOfService: 0,
    companyEmployerName: '',
    employerTIN: '',
    employerAddress: '',
    employerContactPerson: '',
    employerContactNo: '',
    businessActivities: '',
    industry: '',
    // Business Information
    businessName: '',
    businessActivity: '',
    businessMainAddress: '',
    businessAdditionalAddress: '',
    businessID1: '',
    businessID2: '',
    businessPrimaryContact: '',
    businessSecondaryContact: '',
    // Other Business Information
    otherBusinessName: '',
    otherBusinessActivity: '',
    otherBusinessMainAddress: '',
    otherBusinessAdditionalAddress: '',
    otherBusinessID1: '',
    otherBusinessID2: '',
    otherBusinessPrimaryContact: '',
    otherBusinessSecondaryContact: '',
    // Financial Information
    salaryIndicator: 'Monthly',
    fundSource: '',
    salary: 0,
    grossIncome: 0,
    otherIncome: 0,
    otherIncomeSource: '',
    otherIncomeSourceAmount: 0,
    monthlyAverageIncome: 0,
    isLargeExposure: false,
    // Loans
    isMicrofinanceBorrower: false,
    isRegularLoanBorrower: false,
    isComaker: false,
    // Savings
    isSavingsAcctDepositor: false,
    isCurrentAcctDepositor: false,
    // Time Deposit
    isTimeDepositDepositor: false,
    isSpecialSavingsDepositor: false,
    // Credit Line
    enforceCreditLimit: false,
    originalBalance: 0,
    outstandingBalance: 0,
    // Daily OTC IBFT Limit Amount
    pesonet: 0,
    instapay: 0,
    mobileWallet: 0,
  });

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | number | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  // Auto-calculate noOfDependents when dependent fields change
  useEffect(() => {
    const total =
      formData.elementaryDependents +
      formData.highSchoolDependents +
      formData.collegeDependents;
    setFormData((prev) => ({ ...prev, noOfDependents: total }));
  }, [
    formData.elementaryDependents,
    formData.highSchoolDependents,
    formData.collegeDependents,
  ]);

  const handleSave = useCallback(() => {
    // Save functionality will be implemented later
    console.log('Save clicked', formData);
  }, [formData]);

  const handleCancel = useCallback(() => {
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT);
  }, [navigate]);

  const handleOpenModal = useCallback((title: string) => {
    setModalTitle(title);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setModalTitle('');
  }, []);

  const handleModalOk = useCallback(() => {
    // No function - just close the modal
    handleCloseModal();
  }, [handleCloseModal]);

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
  const suffixOptions = ['JR', 'SR', 'II', 'III', 'IV', 'V', 'NONE'];
  const genderOptions = ['Male', 'Female', 'None'];
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
  const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const countryCodeOptions = ['+63', '+1', '+44', '+61', '+65', '+66'];
  const idTypeOptions = [
    "Driver's License",
    'Passport',
    'SSS ID',
    'TIN ID',
    'PhilHealth ID',
    'Postal ID',
    'National ID',
    "Voter's ID",
    'PRC ID',
    'Company ID',
    'School ID',
    'Other',
  ];
  const salaryIndicatorOptions = ['Monthly', 'Weekly', 'Bi-weekly', 'Yearly'];

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
            <span className={styles.requiredText}>
              CIC <RequiredFieldBullet /> AMLA{' '}
              <RequiredFieldBullet type="amla" />
            </span>
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
                      Title <RequiredFieldBullet />
                    </label>
                    <Radio
                      value={formData.title}
                      onChange={(value) => handleInputChange('title', value)}
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
                      onChange={(value) => handleInputChange('lastName', value)}
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
                      onChange={(value) =>
                        handleInputChange('firstName', value)
                      }
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
                      onChange={(value) =>
                        handleInputChange('middleName', value)
                      }
                      placeholder="Enter middle name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Suffix</label>
                    <Radio
                      value={formData.suffix}
                      onChange={(value) => handleInputChange('suffix', value)}
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
                      onChange={(value) => handleInputChange('gender', value)}
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
                      onChange={(value) =>
                        handleInputChange('maritalStatus', value)
                      }
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
                    <AutocompleteInput
                      value={formData.birthPlace}
                      onChange={(value) =>
                        handleInputChange('birthPlace', value)
                      }
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
                      onChange={(value) =>
                        handleInputChange('nationality', value)
                      }
                      suggestions={[]}
                      placeholder="Enter nationality"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Previous Name</label>
                    <NameInput
                      value={formData.previousName}
                      onChange={(value) =>
                        handleInputChange('previousName', value)
                      }
                      placeholder="Enter previous name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Nick Name</label>
                    <NameInput
                      value={formData.nickName}
                      onChange={(value) => handleInputChange('nickName', value)}
                      placeholder="Enter nick name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Blood Type</label>
                    <Radio
                      value={formData.bloodType}
                      onChange={(value) =>
                        handleInputChange('bloodType', value)
                      }
                      options={bloodTypeOptions}
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
                    <Checkbox
                      checked={formData.isDeceased}
                      onChange={(checked) =>
                        handleInputChange('isDeceased', checked)
                      }
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
                      onChange={(checked) =>
                        handleInputChange('isBeneficiary', checked)
                      }
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
                    <TextInput
                      value={formData.schoolLevel}
                      onChange={(value) =>
                        handleInputChange('schoolLevel', value)
                      }
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

        {activeTab === 'contacts' && (
          <div className={styles.tabContent}>
            <div className={styles.formGrid}>
              {/* Addresses Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Addresses</h3>
                  <ListButton
                    icon={Grid3x3}
                    label="Address List"
                    onClick={() => handleOpenModal('Address List')}
                    aria-label="Open Address List"
                  />
                </div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Primary <RequiredFieldBullet />{' '}
                      <RequiredFieldBullet type="amla" />
                    </label>
                    <AutocompleteInput
                      value={formData.address1Used}
                      onChange={(value) =>
                        handleInputChange('address1Used', value)
                      }
                      suggestions={[]}
                      placeholder="Select or enter primary address"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Secondary <RequiredFieldBullet />{' '}
                      <RequiredFieldBullet type="amla" />
                    </label>
                    <AutocompleteInput
                      value={formData.address2Used}
                      onChange={(value) =>
                        handleInputChange('address2Used', value)
                      }
                      suggestions={[]}
                      placeholder="Select or enter secondary address"
                    />
                  </div>
                </div>
              </div>

              {/* Primary ID Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleWithIcon}>
                    <CreditCard size={16} className={styles.sectionIcon} />
                    <h3 className={styles.sectionTitle}>Primary ID</h3>
                  </div>
                  <ListButton
                    icon={Grid3x3}
                    label="Primary ID List"
                    onClick={() => handleOpenModal('Primary ID List')}
                    aria-label="Open Primary ID List"
                  />
                </div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      ID 1: <RequiredFieldBullet />
                    </label>
                    <Radio
                      value={formData.primaryID1}
                      onChange={(value) =>
                        handleInputChange('primaryID1', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select ID 1"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>ID 2:</label>
                    <Radio
                      value={formData.primaryID2}
                      onChange={(value) =>
                        handleInputChange('primaryID2', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select ID 2"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>ID 3:</label>
                    <Radio
                      value={formData.primaryID3}
                      onChange={(value) =>
                        handleInputChange('primaryID3', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select ID 3"
                    />
                  </div>
                </div>
              </div>

              {/* Secondary ID Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleWithIcon}>
                    <CreditCard size={16} className={styles.sectionIcon} />
                    <h3 className={styles.sectionTitle}>Secondary ID</h3>
                  </div>
                  <ListButton
                    icon={Grid3x3}
                    label="Secondary ID List"
                    onClick={() => handleOpenModal('Secondary ID List')}
                    aria-label="Open Secondary ID List"
                  />
                </div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      ID 1: <RequiredFieldBullet />
                    </label>
                    <Radio
                      value={formData.secondaryID1}
                      onChange={(value) =>
                        handleInputChange('secondaryID1', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select or enter ID 1"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>ID 2:</label>
                    <Radio
                      value={formData.secondaryID2}
                      onChange={(value) =>
                        handleInputChange('secondaryID2', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select or enter ID 2"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>ID 3:</label>
                    <Radio
                      value={formData.secondaryID3}
                      onChange={(value) =>
                        handleInputChange('secondaryID3', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select or enter ID 3"
                    />
                  </div>
                </div>
              </div>

              {/* Contacts Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleWithIcon}>
                    <Phone size={16} className={styles.sectionIcon} />
                    <h3 className={styles.sectionTitle}>Contacts</h3>
                  </div>
                  <ListButton
                    icon={Grid3x3}
                    label="Contact List"
                    onClick={() => handleOpenModal('Contact List')}
                    aria-label="Open Contact List"
                  />
                </div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Primary: <RequiredFieldBullet />
                    </label>
                    <Radio
                      value={formData.primaryContact}
                      onChange={(value) =>
                        handleInputChange('primaryContact', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select or enter primary contact"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Secondary:</label>
                    <Radio
                      value={formData.secondaryContact}
                      onChange={(value) =>
                        handleInputChange('secondaryContact', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select or enter secondary contact"
                    />
                  </div>
                </div>
              </div>

              {/* For AMLA Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>For AMLA</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Presented ID Type: <RequiredFieldBullet type="amla" />
                    </label>
                    <Radio
                      value={formData.presentedIDType}
                      onChange={(value) =>
                        handleInputChange('presentedIDType', value)
                      }
                      options={idTypeOptions}
                      placeholder="Select presented ID type"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      ID No. Presented for AMLA:{' '}
                      <RequiredFieldBullet type="amla" />
                    </label>
                    <TextInput
                      value={formData.idNoPresentedForAMLA}
                      onChange={(value) =>
                        handleInputChange('idNoPresentedForAMLA', value)
                      }
                      placeholder="Enter ID number"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Banking Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Mobile Banking</h3>
                  <Button
                    variant="primary"
                    className={styles.activateButton}
                    onClick={() => {
                      // TODO: Implement mobile banking activation
                      console.log('Activate Mobile Banking clicked');
                    }}
                  >
                    <User size={16} />
                    ACTIVATE
                  </Button>
                </div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>Mobile Number:</label>
                    <div className={styles.mobileNumberWrapper}>
                      <div className={styles.countryCodeWrapper}>
                        <Radio
                          value={formData.countryCode}
                          onChange={(value) =>
                            handleInputChange('countryCode', value)
                          }
                          options={countryCodeOptions}
                          placeholder="+63"
                        />
                      </div>
                      <NumberInput
                        decimal={false}
                        value={
                          formData.mobileNumber
                            ? Number(formData.mobileNumber)
                            : undefined
                        }
                        onChange={(value) =>
                          handleInputChange('mobileNumber', value)
                        }
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email Address:</label>
                    <TextInput
                      value={formData.emailAddress}
                      onChange={(value) =>
                        handleInputChange('emailAddress', value)
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className={styles.tabContent}>
            <div className={styles.documentsContainer}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Documents</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.insufficientInformation}
                      onChange={(checked) =>
                        handleInputChange('insufficientInformation', checked)
                      }
                      label="Insufficient Information"
                    />
                    <div className={styles.textareaWrapper}>
                      <Textarea
                        value={formData.insufficientInformationRemarks}
                        onChange={(value) =>
                          handleInputChange(
                            'insufficientInformationRemarks',
                            value,
                          )
                        }
                        placeholder="Type in your remarks(optional)"
                        rows={6}
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.insufficientDocuments}
                      onChange={(checked) =>
                        handleInputChange('insufficientDocuments', checked)
                      }
                      label="Insufficient Documents"
                    />
                    <div className={styles.textareaWrapper}>
                      <Textarea
                        value={formData.insufficientDocumentsRemarks}
                        onChange={(value) =>
                          handleInputChange(
                            'insufficientDocumentsRemarks',
                            value,
                          )
                        }
                        placeholder="Type in your remarks(optional)"
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employment' && (
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
                      onChange={(value) =>
                        handleInputChange('employeeID', value)
                      }
                      placeholder="Enter employee ID"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Occupation</label>
                    <TextInput
                      value={formData.occupation}
                      onChange={(value) =>
                        handleInputChange('occupation', value)
                      }
                      placeholder="Enter occupation"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Status</label>
                    <AutocompleteInput
                      value={formData.status}
                      onChange={(value) => handleInputChange('status', value)}
                      suggestions={[]}
                      placeholder="Type to Search."
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Position</label>
                    <AutocompleteInput
                      value={formData.position}
                      onChange={(value) => handleInputChange('position', value)}
                      suggestions={[]}
                      placeholder="Type to Search."
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Inclusive Date</label>
                    <DatePicker
                      value={formData.inclusiveDate}
                      onChange={(value) =>
                        handleInputChange('inclusiveDate', value)
                      }
                      placeholder="Select the date"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Start Date</label>
                    <DatePicker
                      value={formData.startDate}
                      onChange={(value) =>
                        handleInputChange('startDate', value)
                      }
                      placeholder="Select the date"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>End Date</label>
                    <DatePicker
                      value={formData.endDate}
                      onChange={(value) => handleInputChange('endDate', value)}
                      placeholder="Select the date"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Length of Service</label>
                    <NumberInput
                      value={formData.lengthOfService}
                      onChange={(value) =>
                        handleInputChange('lengthOfService', value)
                      }
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className={styles.employmentColumn}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Company/Employer Name
                    </label>
                    <TextInput
                      value={formData.companyEmployerName}
                      onChange={(value) =>
                        handleInputChange('companyEmployerName', value)
                      }
                      placeholder="Enter company/employer name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Employer TIN</label>
                    <TextInput
                      value={formData.employerTIN}
                      onChange={(value) =>
                        handleInputChange('employerTIN', value)
                      }
                      placeholder="Enter employer TIN"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Employer Address</label>
                    <TextInput
                      value={formData.employerAddress}
                      onChange={(value) =>
                        handleInputChange('employerAddress', value)
                      }
                      placeholder="Enter employer address"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Employer Contact Person
                    </label>
                    <TextInput
                      value={formData.employerContactPerson}
                      onChange={(value) =>
                        handleInputChange('employerContactPerson', value)
                      }
                      placeholder="Enter employer contact person"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Employer Contact No.</label>
                    <TextInput
                      value={formData.employerContactNo}
                      onChange={(value) =>
                        handleInputChange('employerContactNo', value)
                      }
                      placeholder="Enter employer contact number"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Business Activities</label>
                    <AutocompleteInput
                      value={formData.businessActivities}
                      onChange={(value) =>
                        handleInputChange('businessActivities', value)
                      }
                      suggestions={[]}
                      placeholder="Type to Search."
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Industry</label>
                    <AutocompleteInput
                      value={formData.industry}
                      onChange={(value) => handleInputChange('industry', value)}
                      suggestions={[]}
                      placeholder="Type to Search."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className={styles.tabContent}>
            <div className={styles.financialGrid}>
              {/* FINANCIAL INFORMATION Section - Left Column */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>FINANCIAL INFORMATION</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      Salary Indicator:
                      <Info size={14} className={styles.infoIcon} />
                    </label>
                    <Radio
                      value={formData.salaryIndicator}
                      onChange={(value) =>
                        handleInputChange('salaryIndicator', value)
                      }
                      options={salaryIndicatorOptions}
                      placeholder="Select salary indicator"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Fund Source:</label>
                    <div className={styles.inputWithIcons}>
                      <TextInput
                        value={formData.fundSource}
                        onChange={(value) =>
                          handleInputChange('fundSource', value)
                        }
                        placeholder="Enter fund source"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        iconOnly
                        onClick={() => handleOpenModal('Fund Source List')}
                        aria-label="Open fund source list"
                      >
                        <Folder size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Salary:</label>
                    <NumberInput
                      value={formData.salary}
                      onChange={(value) => handleInputChange('salary', value)}
                      placeholder="0.00"
                      decimal
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Gross Income:</label>
                    <NumberInput
                      value={formData.grossIncome}
                      onChange={(value) =>
                        handleInputChange('grossIncome', value)
                      }
                      placeholder="0.00"
                      decimal
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Other Income:</label>
                    <NumberInput
                      value={formData.otherIncome}
                      onChange={(value) =>
                        handleInputChange('otherIncome', value)
                      }
                      placeholder="0.00"
                      decimal
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Other Income Source:</label>
                    <TextInput
                      value={formData.otherIncomeSource}
                      onChange={(value) =>
                        handleInputChange('otherIncomeSource', value)
                      }
                      placeholder="Enter other income source"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Other Income Source Amount:
                    </label>
                    <NumberInput
                      value={formData.otherIncomeSourceAmount}
                      onChange={(value) =>
                        handleInputChange('otherIncomeSourceAmount', value)
                      }
                      placeholder="0.00"
                      decimal
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Monthly Average Income:
                    </label>
                    <NumberInput
                      value={formData.monthlyAverageIncome}
                      onChange={(value) =>
                        handleInputChange('monthlyAverageIncome', value)
                      }
                      placeholder="0.00"
                      decimal
                    />
                  </div>

                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.isLargeExposure}
                      onChange={(checked) =>
                        handleInputChange('isLargeExposure', checked)
                      }
                      label="Is Large Exposure?"
                    />
                  </div>
                </div>
              </div>

              {/* Middle Column: Loans, Savings, Time Deposit */}
              <div className={styles.section}>
                {/* Loans Section */}
                <h3 className={styles.sectionTitle}>Loans</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.isMicrofinanceBorrower}
                      onChange={(checked) =>
                        handleInputChange('isMicrofinanceBorrower', checked)
                      }
                      label="Is Microfinance Borrower?"
                      disabled
                    />
                  </div>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.isRegularLoanBorrower}
                      onChange={(checked) =>
                        handleInputChange('isRegularLoanBorrower', checked)
                      }
                      label="Is Regular Loan Borrower?"
                      disabled
                    />
                  </div>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.isComaker}
                      onChange={(checked) =>
                        handleInputChange('isComaker', checked)
                      }
                      label="Is Comaker?"
                      disabled
                    />
                  </div>
                </div>

                {/* Savings Section */}
                <h3 className={styles.sectionTitle}>Savings</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.isSavingsAcctDepositor}
                      onChange={(checked) =>
                        handleInputChange('isSavingsAcctDepositor', checked)
                      }
                      label="Is Savings Acct Depositor?"
                      disabled
                    />
                  </div>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.isCurrentAcctDepositor}
                      onChange={(checked) =>
                        handleInputChange('isCurrentAcctDepositor', checked)
                      }
                      label="Is Current Acct Depositor?"
                      disabled
                    />
                  </div>
                </div>

                {/* Time Deposit Section */}
                <h3 className={styles.sectionTitle}>Time Deposit</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.isTimeDepositDepositor}
                      onChange={(checked) =>
                        handleInputChange('isTimeDepositDepositor', checked)
                      }
                      label="Is Time Deposit Depositor?"
                      disabled
                    />
                  </div>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.isSpecialSavingsDepositor}
                      onChange={(checked) =>
                        handleInputChange('isSpecialSavingsDepositor', checked)
                      }
                      label="Is Special Savings Depositor?"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Credit Line, Daily OTC IBFT Limit Amount */}
              <div className={styles.section}>
                {/* Credit Line Section */}
                <h3 className={styles.sectionTitle}>Credit Line</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <Checkbox
                      checked={formData.enforceCreditLimit}
                      onChange={(checked) =>
                        handleInputChange('enforceCreditLimit', checked)
                      }
                      label="Enforce Credit Limit"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Original Balance:</label>
                    <NumberInput
                      value={formData.originalBalance}
                      onChange={(value) =>
                        handleInputChange('originalBalance', value)
                      }
                      placeholder="0.00"
                      decimal
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Outstanding Balance:</label>
                    <NumberInput
                      value={formData.outstandingBalance}
                      onChange={(value) =>
                        handleInputChange('outstandingBalance', value)
                      }
                      placeholder="0.00"
                      decimal
                    />
                  </div>
                </div>

                {/* Daily OTC IBFT Limit Amount Section */}
                <h3 className={styles.sectionTitle}>
                  Daily OTC IBFT Limit Amount
                </h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>PESONet:</label>
                    <NumberInput
                      value={formData.pesonet}
                      onChange={(value) => handleInputChange('pesonet', value)}
                      placeholder=""
                      decimal
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>InstaPay:</label>
                    <NumberInput
                      value={formData.instapay}
                      onChange={(value) => handleInputChange('instapay', value)}
                      placeholder=""
                      decimal
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Mobile Wallet:</label>
                    <NumberInput
                      value={formData.mobileWallet}
                      onChange={(value) =>
                        handleInputChange('mobileWallet', value)
                      }
                      placeholder=""
                      decimal
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className={styles.tabContent}>
            <div className={styles.businessGrid}>
              {/* BUSINESS INFORMATION Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>BUSINESS INFORMATION</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>Business Name</label>
                    <TextInput
                      value={formData.businessName}
                      onChange={(value) =>
                        handleInputChange('businessName', value)
                      }
                      placeholder="Enter business name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Business Activities</label>
                    <AutocompleteInput
                      value={formData.businessActivity}
                      onChange={(value) =>
                        handleInputChange('businessActivity', value)
                      }
                      suggestions={[]}
                      placeholder="Type to Search."
                    />
                  </div>

                  {/* Addresses Section */}
                  <div className={styles.subsection}>
                    <h4 className={styles.subsectionTitle}>Addresses</h4>
                    <div className={styles.fieldsGrid}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Main <RequiredFieldBullet />{' '}
                          <RequiredFieldBullet type="amla" />
                        </label>
                        <AutocompleteInput
                          value={formData.businessMainAddress}
                          onChange={(value) =>
                            handleInputChange('businessMainAddress', value)
                          }
                          suggestions={[]}
                          placeholder="Select or enter address"
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Additional <RequiredFieldBullet />{' '}
                          <RequiredFieldBullet type="amla" />
                        </label>
                        <AutocompleteInput
                          value={formData.businessAdditionalAddress}
                          onChange={(value) =>
                            handleInputChange(
                              'businessAdditionalAddress',
                              value,
                            )
                          }
                          suggestions={[]}
                          placeholder="Select or enter address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business ID Section */}
                  <div className={styles.subsection}>
                    <div className={styles.subsectionHeader}>
                      <div className={styles.sectionTitleWithIcon}>
                        <FileText size={16} className={styles.sectionIcon} />
                        <h4 className={styles.subsectionTitle}>Business ID</h4>
                      </div>
                      <span className={styles.subsectionLabel}>
                        Identification
                      </span>
                    </div>
                    <div className={styles.fieldsGrid}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          ID 1 <RequiredFieldBullet />
                        </label>
                        <AutocompleteInput
                          value={formData.businessID1}
                          onChange={(value) =>
                            handleInputChange('businessID1', value)
                          }
                          suggestions={[]}
                          placeholder="Select or enter ID"
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>ID 2</label>
                        <AutocompleteInput
                          value={formData.businessID2}
                          onChange={(value) =>
                            handleInputChange('businessID2', value)
                          }
                          suggestions={[]}
                          placeholder="Select or enter ID"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contacts Section */}
                  <div className={styles.subsection}>
                    <div className={styles.subsectionHeader}>
                      <div className={styles.sectionTitleWithIcon}>
                        <Phone size={16} className={styles.sectionIcon} />
                        <h4 className={styles.subsectionTitle}>Contacts</h4>
                      </div>
                      <span className={styles.subsectionLabel}>
                        Contact List
                      </span>
                    </div>
                    <div className={styles.fieldsGrid}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Primary <RequiredFieldBullet />
                        </label>
                        <AutocompleteInput
                          value={formData.businessPrimaryContact}
                          onChange={(value) =>
                            handleInputChange('businessPrimaryContact', value)
                          }
                          suggestions={[]}
                          placeholder="Select or enter contact"
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>Secondary</label>
                        <AutocompleteInput
                          value={formData.businessSecondaryContact}
                          onChange={(value) =>
                            handleInputChange('businessSecondaryContact', value)
                          }
                          suggestions={[]}
                          placeholder="Select or enter contact"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Business Information Section */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Other Business Information
                </h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>Business Name</label>
                    <TextInput
                      value={formData.otherBusinessName}
                      onChange={(value) =>
                        handleInputChange('otherBusinessName', value)
                      }
                      placeholder="Enter business name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Business Activities</label>
                    <AutocompleteInput
                      value={formData.otherBusinessActivity}
                      onChange={(value) =>
                        handleInputChange('otherBusinessActivity', value)
                      }
                      suggestions={[]}
                      placeholder="Type to Search."
                    />
                  </div>

                  {/* Addresses Section */}
                  <div className={styles.subsection}>
                    <h4 className={styles.subsectionTitle}>Addresses</h4>
                    <div className={styles.fieldsGrid}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Main <RequiredFieldBullet />{' '}
                          <RequiredFieldBullet type="amla" />
                        </label>
                        <AutocompleteInput
                          value={formData.otherBusinessMainAddress}
                          onChange={(value) =>
                            handleInputChange('otherBusinessMainAddress', value)
                          }
                          suggestions={[]}
                          placeholder="Select or enter address"
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Additional <RequiredFieldBullet />{' '}
                          <RequiredFieldBullet type="amla" />
                        </label>
                        <AutocompleteInput
                          value={formData.otherBusinessAdditionalAddress}
                          onChange={(value) =>
                            handleInputChange(
                              'otherBusinessAdditionalAddress',
                              value,
                            )
                          }
                          suggestions={[]}
                          placeholder="Select or enter address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business ID Section */}
                  <div className={styles.subsection}>
                    <div className={styles.subsectionHeader}>
                      <div className={styles.sectionTitleWithIcon}>
                        <FileText size={16} className={styles.sectionIcon} />
                        <h4 className={styles.subsectionTitle}>Business ID</h4>
                      </div>
                      <span className={styles.subsectionLabel}>
                        Identification
                      </span>
                    </div>
                    <div className={styles.fieldsGrid}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          ID 1 <RequiredFieldBullet />
                        </label>
                        <AutocompleteInput
                          value={formData.otherBusinessID1}
                          onChange={(value) =>
                            handleInputChange('otherBusinessID1', value)
                          }
                          suggestions={[]}
                          placeholder="Select or enter ID"
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>ID 2</label>
                        <AutocompleteInput
                          value={formData.otherBusinessID2}
                          onChange={(value) =>
                            handleInputChange('otherBusinessID2', value)
                          }
                          suggestions={[]}
                          placeholder="Select or enter ID"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contacts Section */}
                  <div className={styles.subsection}>
                    <div className={styles.subsectionHeader}>
                      <div className={styles.sectionTitleWithIcon}>
                        <Phone size={16} className={styles.sectionIcon} />
                        <h4 className={styles.subsectionTitle}>Contacts</h4>
                      </div>
                      <span className={styles.subsectionLabel}>
                        Contact List
                      </span>
                    </div>
                    <div className={styles.fieldsGrid}>
                      <div className={styles.field}>
                        <label className={styles.label}>
                          Primary <RequiredFieldBullet />
                        </label>
                        <AutocompleteInput
                          value={formData.otherBusinessPrimaryContact}
                          onChange={(value) =>
                            handleInputChange(
                              'otherBusinessPrimaryContact',
                              value,
                            )
                          }
                          suggestions={[]}
                          placeholder="Select or enter contact"
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>Secondary</label>
                        <AutocompleteInput
                          value={formData.otherBusinessSecondaryContact}
                          onChange={(value) =>
                            handleInputChange(
                              'otherBusinessSecondaryContact',
                              value,
                            )
                          }
                          suggestions={[]}
                          placeholder="Select or enter contact"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'individual' &&
          activeTab !== 'contacts' &&
          activeTab !== 'documents' &&
          activeTab !== 'employment' &&
          activeTab !== 'business' &&
          activeTab !== 'financial' && (
            <div className={styles.tabContent}>
              <div className={styles.emptyTab}>
                {tabs.find((t) => t.id === activeTab)?.label} content coming
                soon...
              </div>
            </div>
          )}
      </div>

      {/* Empty Modal for List Buttons */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* Empty modal body */}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClientInformationSystemInsert;
