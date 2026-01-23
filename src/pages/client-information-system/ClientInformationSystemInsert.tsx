import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Button from 'atomic-components/Button';
import RequiredFieldBullet from 'atomic-components/RequiredFieldBullet';
import { ROUTES } from 'utils/constants';
import IndividualTab from './Individual';
import ContactsTab from './Contacts';
import DocumentsTab from './Documents';
import EmploymentTab from './Employment';
import BusinessTab from './Business';
import FinancialTab from './Financial';
import AmlaTab from './Amla';
import RemarksTab from './Remarks';
import PictureTab from './Picture';
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
          <IndividualTab
            formData={formData}
            onInputChange={handleInputChange}
            onBirthDateChange={handleBirthDateChange}
            titleOptions={titleOptions}
            suffixOptions={suffixOptions}
            genderOptions={genderOptions}
            maritalStatusOptions={maritalStatusOptions}
            bloodTypeOptions={bloodTypeOptions}
          />
        )}

        {activeTab === 'contacts' && (
          <ContactsTab
            formData={formData}
            onInputChange={handleInputChange}
            onOpenModal={handleOpenModal}
            idTypeOptions={idTypeOptions}
            countryCodeOptions={countryCodeOptions}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsTab formData={formData} onInputChange={handleInputChange} />
        )}

        {activeTab === 'employment' && (
          <EmploymentTab
            formData={formData}
            onInputChange={handleInputChange}
          />
        )}

        {activeTab === 'business' && (
          <BusinessTab formData={formData} onInputChange={handleInputChange} />
        )}

        {activeTab === 'financial' && (
          <FinancialTab
            formData={formData}
            onInputChange={handleInputChange}
            onOpenModal={handleOpenModal}
            salaryIndicatorOptions={salaryIndicatorOptions}
          />
        )}

        {activeTab === 'amla' && <AmlaTab />}

        {activeTab === 'remarks' && <RemarksTab />}

        {activeTab === 'picture' && <PictureTab />}
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
