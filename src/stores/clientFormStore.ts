/**
 * Client Form Store - Zustand Store for Client Information System Form
 *
 * This store manages the client form state and automatically persists data to IndexedDB.
 * When the form is filled out and the tab is accidentally refreshed, the data will be
 * automatically restored from IndexedDB.
 *
 * Features:
 * - Auto-save form data to IndexedDB whenever form fields change
 * - Auto-load form data from IndexedDB on component mount
 * - Reset form functionality that clears both Zustand state and IndexedDB
 * - Active tab persistence
 */

import { create } from 'zustand';
import {
  storeClientFormData,
  getClientFormData,
  removeClientFormData,
} from 'utils/indexedDBUtils';

/**
 * Form Data Interface - matches the FormData interface in ClientInformationSystemInsert.tsx
 */
export interface ClientFormData {
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
  // AMLA - Employee Related Account (ERA)
  isBankEmployeeRelated: boolean;
  bankEmployeeName: string;
  relationship: string;
  dosri: string;
  isBankEmployee: boolean;
  employeeType: string;
  // AMLA - Politically Exposed Person
  isPEP: boolean;
  pepPosition: string;
  pepPlace: string;
  pepTerm: string;
  // AMLA - Tagging
  isWatchListed: boolean;
  isLinkedAccount: boolean;
  isPayee: boolean;
  relatedParty: string;
  // AMLA - Risk Assessment
  overallScore: number;
  classification: string;
  customerDueDiligence: string;
  // Remarks/Groupings
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
  // Picture/Signature
  clientPicture1: string;
  clientPicture2: string;
  signaturePicture1: string;
  signaturePicture2: string;
}

/**
 * Initial form data state
 */
const initialFormData: ClientFormData = {
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
  businessName: '',
  businessActivity: '',
  businessMainAddress: '',
  businessAdditionalAddress: '',
  businessID1: '',
  businessID2: '',
  businessPrimaryContact: '',
  businessSecondaryContact: '',
  otherBusinessName: '',
  otherBusinessActivity: '',
  otherBusinessMainAddress: '',
  otherBusinessAdditionalAddress: '',
  otherBusinessID1: '',
  otherBusinessID2: '',
  otherBusinessPrimaryContact: '',
  otherBusinessSecondaryContact: '',
  salaryIndicator: 'Monthly',
  fundSource: '',
  salary: 0,
  grossIncome: 0,
  otherIncome: 0,
  otherIncomeSource: '',
  otherIncomeSourceAmount: 0,
  monthlyAverageIncome: 0,
  isLargeExposure: false,
  isMicrofinanceBorrower: false,
  isRegularLoanBorrower: false,
  isComaker: false,
  isSavingsAcctDepositor: false,
  isCurrentAcctDepositor: false,
  isTimeDepositDepositor: false,
  isSpecialSavingsDepositor: false,
  enforceCreditLimit: false,
  originalBalance: 0,
  outstandingBalance: 0,
  pesonet: 0,
  instapay: 0,
  mobileWallet: 0,
  isBankEmployeeRelated: false,
  bankEmployeeName: '',
  relationship: '',
  dosri: '',
  isBankEmployee: false,
  employeeType: '',
  isPEP: false,
  pepPosition: '',
  pepPlace: '',
  pepTerm: '1900-01-01',
  isWatchListed: false,
  isLinkedAccount: false,
  isPayee: false,
  relatedParty: '',
  overallScore: 0,
  classification: 'None',
  customerDueDiligence: 'None',
  group1: '',
  group2: '',
  group3: '',
  customUse1: '',
  customUse2: '',
  customUse3: '',
  customUse4: '',
  remarks: '',
  clientStatus: 'Active',
  memberSinceDate: '',
  lastClientUpdate: '1900-01-01',
  clientPicture1: '',
  clientPicture2: '',
  signaturePicture1: '',
  signaturePicture2: '',
};

/**
 * Store state interface
 */
interface ClientFormState {
  formData: ClientFormData;
  activeTab: string;
  isLoading: boolean;
  // Actions
  setFormData: (data: Partial<ClientFormData>) => void;
  setActiveTab: (tab: string) => void;
  resetForm: () => void;
  loadFormFromIndexedDB: () => Promise<void>;
  // Internal: Auto-save function (called automatically on form data changes)
  _autoSave: () => Promise<void>;
}

/**
 * Zustand Store for Client Form
 *
 * Usage:
 * const formData = useClientFormStore((state) => state.formData);
 * const setFormData = useClientFormStore((state) => state.setFormData);
 * const loadFormFromIndexedDB = useClientFormStore((state) => state.loadFormFromIndexedDB);
 */
export const useClientFormStore = create<ClientFormState>((set, get) => ({
  formData: initialFormData,
  activeTab: 'individual',
  isLoading: false,

  /**
   * Update form data and auto-save to IndexedDB
   */
  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
    // Auto-save to IndexedDB after state update
    // Use setTimeout to ensure state is updated before saving
    setTimeout(() => {
      void get()._autoSave();
    }, 0);
  },

  /**
   * Set active tab
   */
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  /**
   * Reset form to initial state and clear IndexedDB
   */
  resetForm: () => {
    set({ formData: initialFormData, activeTab: 'individual' });
    void removeClientFormData().catch((error) => {
      console.error('Failed to remove form data from IndexedDB:', error);
    });
  },

  /**
   * Load form data from IndexedDB
   * Call this on component mount to restore saved data
   */
  loadFormFromIndexedDB: async () => {
    set({ isLoading: true });
    try {
      const savedData = await getClientFormData<ClientFormData>();
      if (savedData) {
        set({ formData: savedData });
      }
    } catch (error) {
      console.error('Failed to load form data from IndexedDB:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Internal: Auto-save form data to IndexedDB
   * Called automatically whenever formData changes
   */
  _autoSave: async () => {
    try {
      await storeClientFormData(get().formData);
    } catch (error) {
      console.error('Failed to auto-save form data to IndexedDB:', error);
    }
  },
}));
