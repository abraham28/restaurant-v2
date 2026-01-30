import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'atomic-components/Button';
import { ROUTES } from 'utils/constants';
import { getDraft, storeDraft, generateDraftId } from 'utils/indexedDBUtils';
import cifTitleData from 'data/cifTableOfRecord/cifTitle.json';
import cifClientNameSuffixData from 'data/cifTableOfRecord/cifClientNameSuffix.json';
import ClientType from './ClientType/ClientType';
import IndividualTab from './Individual/Individual';
import CompanyTab from './Company/Company';
import GovernmentTab from './Government/Government';
import OrganizationTab from './Organization/Organization';
import ContactsTab from './Contacts/Contacts';
import DocumentsTab from './Documents/Documents';
import EmploymentTab from './Employment/Employment';
import BusinessTab from './Business/Business';
import FinancialTab from './Financial/Financial';
import AmlaTab from './Amla/Amla';
import RemarksTab from './Remarks/Remarks';
import PictureTab from './Picture/Picture';
import Stepper from 'atomic-components/Stepper';
import RequiredFieldBullet from 'atomic-components/RequiredFieldBullet';
import styles from './CIFInsert.module.scss';

type TabType =
  | 'clientType'
  | 'individual'
  | 'company'
  | 'government'
  | 'organization'
  | 'contacts'
  | 'documents'
  | 'employment'
  | 'business'
  | 'financial'
  | 'amla'
  | 'remarks'
  | 'picture';

/** Draft payload saved from CIFInsert (Cancel) - includes full form state */
interface CIFInsertDraftPayload {
  formData: typeof initialFormData;
  selectedTypes: {
    individual: boolean;
    company: boolean;
    government: boolean;
    organization: boolean;
  };
  activeTab: TabType;
}

const initialFormData = {
  // Individual
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
  // Company
  companyType: '',
  companyName: '',
  registeredName: '',
  tin: '',
  startOfBusiness: '',
  numberOfEmployees: 0,
  trader1: '',
  trader2: '',
  firmSize: '',
  conglomerateDomain: '',
  entityLocation: '',
  countryOfOrigin: '',
  placeOfRegistration: '',
  legalForm: '',
  companyIndustry: '',
  originOfEntity: '',
  companyBusinessActivity: '',
  netTaxableIncome: 0,
  monthlyExpenses: 0,
  parentClient: '',
  roleOfParent: '',
  contactPerson: '',
  designation: '',
  // Government
  // Organization
  organizationRemarks: '',
  organizationBusinessActivity: '',
  organizationNationality: '',
  // Contacts
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
  countryCode: '',
  mobileNumber: '',
  emailAddress: '',
  // Documents
  insufficientInformation: false,
  insufficientInformationRemarks: '',
  insufficientDocuments: false,
  insufficientDocumentsRemarks: '',
  // Employment
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
  // Business
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
  // Financial
  salaryIndicator: '',
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
  // AMLA
  isBankEmployeeRelated: false,
  bankEmployeeName: '',
  relationship: '',
  dosri: '',
  isBankEmployee: false,
  employeeType: '',
  isPEP: false,
  pepPosition: '',
  pepPlace: '',
  pepTerm: '',
  isWatchListed: false,
  isLinkedAccount: false,
  isPayee: false,
  relatedParty: '',
  overallScore: 0,
  classification: '',
  customerDueDiligence: '',
  // Remarks
  group1: '',
  group2: '',
  group3: '',
  customUse1: '',
  customUse2: '',
  customUse3: '',
  customUse4: '',
  remarks: '',
  clientStatus: '',
  memberSinceDate: '',
  lastClientUpdate: '',
  // Picture
  clientPicture1: '',
  clientPicture2: '',
  signaturePicture1: '',
  signaturePicture2: '',
};

function CIFInsert() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>('clientType');
  const [maxTabIndexReached, setMaxTabIndexReached] = useState(0);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState({
    individual: false,
    company: false,
    government: false,
    organization: false,
  });

  // Mock form data - in real app, this would come from Zustand store
  const [formData, setFormData] = useState(initialFormData);

  const handleTypeChange = useCallback(
    (type: string, checked: boolean) => {
      if (checked) {
        // If user is switching to a different client type, reset form and draft
        // so the previous type's data (e.g. individual) is cleared
        const currentType = selectedTypes.individual
          ? 'individual'
          : selectedTypes.company
            ? 'company'
            : selectedTypes.government
              ? 'government'
              : selectedTypes.organization
                ? 'organization'
                : null;
        const isSwitchingType = currentType !== null && currentType !== type;
        if (isSwitchingType) {
          setFormData({ ...initialFormData });
          setDraftId(null);
        }
        // If checking a checkbox, uncheck all others (only one can be selected)
        setSelectedTypes({
          individual: type === 'individual',
          company: type === 'company',
          government: type === 'government',
          organization: type === 'organization',
        });
      } else {
        // If unchecking, just set that one to false
        setSelectedTypes((prev) => ({
          ...prev,
          [type]: false,
        }));
      }
    },
    [selectedTypes],
  );

  const handleInputChange = useCallback(
    (field: string, value: string | number | boolean) => {
      // In real app, this would update Zustand store
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleDateChange = useCallback((field: string, date: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  }, []);

  const handleBirthDateChange = useCallback((date: string) => {
    // Calculate age from birthdate
    let calculatedAge = 0;
    if (date) {
      try {
        // Parse YYYY-MM-DD format
        const [year, month, day] = date.split('-').map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();

        // Calculate age
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Adjust if birthday hasn't occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        calculatedAge = age > 0 ? age : 0;
      } catch (error) {
        console.error('Error calculating age:', error);
        calculatedAge = 0;
      }
    }

    setFormData((prev) => ({
      ...prev,
      birthDate: date,
      age: calculatedAge,
    }));
  }, []);

  const handleOpenModal = useCallback((title: string) => {
    // In real app, this would open a modal
    console.log('Open modal:', title);
  }, []);

  const hasSelectedType =
    selectedTypes.individual ||
    selectedTypes.company ||
    selectedTypes.government ||
    selectedTypes.organization;

  // Ordered tabs for Next/Back and for determining which breadcrumbs are enabled.
  // When Company is selected, exclude Employment and Business tabs.
  const getOrderedTabs = useCallback((): TabType[] => {
    const base: TabType[] = ['clientType'];
    if (selectedTypes.individual) base.push('individual');
    else if (selectedTypes.company) base.push('company');
    else if (selectedTypes.government) base.push('government');
    else if (selectedTypes.organization) base.push('organization');
    base.push('contacts', 'documents');
    if (!selectedTypes.company) {
      base.push('employment', 'business');
    }
    base.push('financial', 'amla', 'remarks', 'picture');
    return base;
  }, [selectedTypes]);

  const orderedTabs = getOrderedTabs();
  const currentTabIndex = orderedTabs.indexOf(activeTab);
  const isFirstTab = currentTabIndex <= 0;
  const isLastTab =
    currentTabIndex < 0 || currentTabIndex >= orderedTabs.length - 1;

  // When Company is selected, Employment and Business are not in orderedTabs;
  // if user was on one of those, move to a valid tab.
  useEffect(() => {
    if (selectedTypes.company && !orderedTabs.includes(activeTab)) {
      setActiveTab(orderedTabs[1] ?? 'company');
    }
  }, [selectedTypes.company, orderedTabs, activeTab]);

  const getBreadcrumbIndex = useCallback(
    (tabId: TabType): number => {
      const idx = orderedTabs.indexOf(tabId);
      return idx >= 0 ? idx : 0;
    },
    [orderedTabs],
  );

  useEffect(() => {
    const idx = getBreadcrumbIndex(activeTab);
    setMaxTabIndexReached((prev) => Math.max(prev, idx));
  }, [activeTab, getBreadcrumbIndex]);

  // Restore form when returning from Review page (Back to Edit)
  useEffect(() => {
    const state = location.state as {
      draftId?: string;
      formData?: typeof initialFormData;
      selectedTypes?: typeof selectedTypes;
    } | null;
    if (state?.draftId) return;
    if (
      state?.formData &&
      state?.selectedTypes &&
      typeof state.formData === 'object' &&
      typeof state.selectedTypes === 'object'
    ) {
      setFormData(state.formData);
      setSelectedTypes(state.selectedTypes);
      setActiveTab('picture');
    }
  }, [location.state]);

  // Restore draft when opening from list (draft click)
  useEffect(() => {
    const state = location.state as { draftId?: string } | null;
    const stateDraftId = state?.draftId;
    if (!stateDraftId) return;

    let cancelled = false;
    void getDraft<CIFInsertDraftPayload | Record<string, unknown>>(
      stateDraftId,
    ).then((draft) => {
      if (cancelled || !draft) return;
      const payload = draft.formData;

      // Draft saved from CIFInsert has formData, selectedTypes, activeTab
      if (
        payload &&
        typeof payload === 'object' &&
        'formData' in payload &&
        'selectedTypes' in payload &&
        'activeTab' in payload
      ) {
        const fullPayload = payload as CIFInsertDraftPayload;
        const {
          formData: draftFormData,
          selectedTypes: draftTypes,
          activeTab: draftTab,
        } = fullPayload;
        setFormData(draftFormData);
        setSelectedTypes(draftTypes);
        setActiveTab(draftTab);
        setDraftId(draft.id);
      } else {
        // Draft from type-specific pages: formData is the raw form, use metadata.clientType
        setFormData({ ...initialFormData, ...payload });
        const clientType = draft.metadata.clientType;
        const types = {
          individual: clientType === 'Individual',
          company: clientType === 'Company',
          government: clientType === 'Government',
          organization: clientType === 'Organization',
        };
        setSelectedTypes(types);
        const firstTab: TabType =
          clientType === 'Individual'
            ? 'individual'
            : clientType === 'Company'
              ? 'company'
              : clientType === 'Government'
                ? 'government'
                : 'organization';
        setActiveTab(firstTab);
        setDraftId(draft.id);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [location.state]);

  const getStepperSteps = useCallback(() => {
    const secondLabel = hasSelectedType
      ? selectedTypes.individual
        ? 'Individual'
        : selectedTypes.company
          ? 'Company'
          : selectedTypes.government
            ? 'Government'
            : 'Organization'
      : '-';

    const steps = [
      { id: 'clientType', label: 'Client Type' },
      {
        id: hasSelectedType
          ? selectedTypes.individual
            ? 'individual'
            : selectedTypes.company
              ? 'company'
              : selectedTypes.government
                ? 'government'
                : 'organization'
          : 'clientTypeSlot',
        label: secondLabel,
      },
      { id: 'contacts', label: 'Contacts/Addresses/IDs' },
      { id: 'documents', label: 'Documents' },
      ...(selectedTypes.company
        ? []
        : [
            { id: 'employment' as const, label: 'Employment' },
            { id: 'business' as const, label: 'Business' },
          ]),
      { id: 'financial', label: 'Financial' },
      { id: 'amla', label: 'AMLA/Tags' },
      { id: 'remarks', label: 'Remarks/Groupings' },
      { id: 'picture', label: 'Picture/Signature' },
    ];

    return steps;
  }, [hasSelectedType, selectedTypes]);

  const getCurrentStepIndex = useCallback(() => {
    const steps = getStepperSteps();
    const currentIndex = steps.findIndex((step) => step.id === activeTab);
    return currentIndex >= 0 ? currentIndex : 0;
  }, [activeTab, getStepperSteps]);

  const handleStepClick = useCallback(
    (stepId: string) => {
      if (stepId === 'clientTypeSlot' || stepId === activeTab) return;

      // Only allow clicking on valid tab types
      if (
        ![
          'clientType',
          'individual',
          'company',
          'government',
          'organization',
          'contacts',
          'documents',
          'employment',
          'business',
          'financial',
          'amla',
          'remarks',
          'picture',
        ].includes(stepId)
      ) {
        return;
      }

      const stepIndex = getBreadcrumbIndex(stepId as TabType);
      if (stepIndex <= maxTabIndexReached) {
        setActiveTab(stepId as TabType);
      }
    },
    [activeTab, maxTabIndexReached, getBreadcrumbIndex],
  );

  const handleNext = useCallback(() => {
    if (isLastTab) return;
    const nextIndex = currentTabIndex + 1;
    if (nextIndex < orderedTabs.length) {
      setActiveTab(orderedTabs[nextIndex]);
    }
  }, [currentTabIndex, isLastTab, orderedTabs]);

  const handleBack = useCallback(() => {
    if (isFirstTab) return;
    const prevIndex = currentTabIndex - 1;
    if (prevIndex >= 0) {
      setActiveTab(orderedTabs[prevIndex]);
    }
  }, [currentTabIndex, isFirstTab, orderedTabs]);

  const handleCancel = useCallback(async () => {
    // Don't save draft if user is still on client type step only
    if (activeTab === 'clientType') {
      navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT);
      return;
    }

    const id = draftId || generateDraftId();
    const clientName =
      formData.companyName?.trim() ||
      (formData.firstName || formData.lastName
        ? `${formData.firstName || ''} ${formData.lastName || ''}`.trim()
        : undefined) ||
      'Untitled Draft';
    const clientType = selectedTypes.individual
      ? 'Individual'
      : selectedTypes.company
        ? 'Company'
        : selectedTypes.government
          ? 'Government'
          : selectedTypes.organization
            ? 'Organization'
            : 'Individual';
    const payload: CIFInsertDraftPayload = {
      formData,
      selectedTypes,
      activeTab,
    };
    try {
      await storeDraft(id, payload, clientName, clientType);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT);
  }, [navigate, draftId, formData, selectedTypes, activeTab]);

  // Mock options for dropdowns
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
  const countryCodeOptions = ['+63', '+1', '+44', '+61', '+65', '+66'];
  const dosriOptions = ['Yes', 'No', 'N/A'];
  const relatedPartyOptions = ['None', 'Related', 'Affiliate'];
  const customerDueDiligenceOptions = [
    'None',
    'Simplified',
    'Standard',
    'Enhanced',
  ];
  const salaryIndicatorOptions = ['Monthly', 'Weekly', 'Bi-weekly', 'Yearly'];

  const titleOptions = useMemo(
    () =>
      (cifTitleData as Array<{ TitleID: string; Description: string }>).map(
        (t) => t.Description,
      ),
    [],
  );
  const suffixOptions = useMemo(
    () =>
      (
        cifClientNameSuffixData as Array<{
          SuffixID: string;
          Suffix: string;
        }>
      ).map((s) => s.Suffix),
    [],
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Information System - Insert</h1>
        <div className={styles.headerLegend}>
          <span className={styles.legendItem}>
            CIC
            <RequiredFieldBullet type="cic" />
          </span>
          <span className={styles.legendItem}>
            ALMA
            <RequiredFieldBullet type="amla" />
          </span>
          <Button
            variant="outline"
            onClick={() => {
              void handleCancel();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className={styles.stepperContainer}>
        <Stepper
          steps={getStepperSteps().map((step) => ({
            ...step,
            disabled:
              step.id === 'clientTypeSlot' ||
              getBreadcrumbIndex(step.id as TabType) > maxTabIndexReached,
          }))}
          currentStep={getCurrentStepIndex()}
          onStepClick={handleStepClick}
        />
      </div>

      <div className={styles.content}>
        {activeTab === 'clientType' && (
          <ClientType
            selectedTypes={selectedTypes}
            onChange={handleTypeChange}
          />
        )}
        {activeTab === 'individual' && (
          <IndividualTab
            formData={formData}
            onInputChange={handleInputChange}
            onBirthDateChange={handleBirthDateChange}
            titleOptions={titleOptions}
            suffixOptions={suffixOptions}
            genderOptions={['Male', 'Female']}
            maritalStatusOptions={['Single', 'Married', 'Divorced', 'Widowed']}
            bloodTypeOptions={[
              'A+',
              'A-',
              'B+',
              'B-',
              'AB+',
              'AB-',
              'O+',
              'O-',
            ]}
          />
        )}
        {activeTab === 'company' && (
          <CompanyTab
            formData={{
              ...formData,
              industry: formData.companyIndustry,
              businessActivity: formData.companyBusinessActivity,
            }}
            onInputChange={(field, value) => {
              if (field === 'industry') {
                handleInputChange('companyIndustry', value);
              } else if (field === 'businessActivity') {
                handleInputChange('companyBusinessActivity', value);
              } else {
                handleInputChange(field, value);
              }
            }}
            onDateChange={handleDateChange}
            companyTypeOptions={[
              'None',
              'Corporation and Partnerships',
              'One Person Corporation',
              'Sole or One Proprietorship',
            ]}
            firmSizeOptions={['None', 'Small', 'Medium', 'Large']}
          />
        )}
        {activeTab === 'government' && (
          <GovernmentTab
            formData={formData}
            onInputChange={handleInputChange}
            onDateChange={handleDateChange}
            companyTypeOptions={[
              'None',
              'Corporation and Partnerships',
              'One Person Corporation',
              'Sole or One Proprietorship',
            ]}
            firmSizeOptions={['None', 'Small', 'Medium', 'Large']}
          />
        )}
        {activeTab === 'organization' && (
          <OrganizationTab
            formData={{
              ...formData,
              remarks: formData.organizationRemarks,
              businessActivity: formData.organizationBusinessActivity,
              nationality: formData.organizationNationality,
            }}
            onInputChange={(field, value) => {
              if (field === 'remarks') {
                handleInputChange('organizationRemarks', value);
              } else if (field === 'businessActivity') {
                handleInputChange('organizationBusinessActivity', value);
              } else if (field === 'nationality') {
                handleInputChange('organizationNationality', value);
              } else {
                handleInputChange(field, value);
              }
            }}
            onDateChange={handleDateChange}
            companyTypeOptions={[
              'None',
              'Corporation and Partnerships',
              'One Person Corporation',
              'Sole or One Proprietorship',
            ]}
            firmSizeOptions={['None', 'Small', 'Medium', 'Large']}
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
        {activeTab === 'amla' && (
          <AmlaTab
            formData={formData}
            onInputChange={handleInputChange}
            onOpenModal={handleOpenModal}
            dosriOptions={dosriOptions}
            relatedPartyOptions={relatedPartyOptions}
            customerDueDiligenceOptions={customerDueDiligenceOptions}
          />
        )}
        {activeTab === 'remarks' && (
          <RemarksTab
            formData={formData}
            onInputChange={handleInputChange}
            clientStatusOptions={['Active', 'Inactive', 'Suspended', 'Closed']}
          />
        )}
        {activeTab === 'picture' && (
          <PictureTab formData={formData} onInputChange={handleInputChange} />
        )}
      </div>

      {/* Floating Back & Next/Save - hidden until a client type is selected */}
      {(hasSelectedType || !isFirstTab) && (
        <div className={styles.floatingNavButtons}>
          {!isFirstTab && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {isLastTab ? (
            <Button
              variant="primary"
              onClick={() => {
                navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.REVIEW, {
                  state: { formData, selectedTypes },
                });
              }}
            >
              Review
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default CIFInsert;
