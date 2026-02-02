import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'atomic-components/Button';
import { ROUTES } from 'utils/constants';
import styles from './Review.module.scss';
import type {
  CIFReviewFormData,
  CIFReviewSelectedTypes,
  CIFReviewState,
} from './types';

function formatValue(value: string | number | boolean | undefined): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number' && value === 0 && value !== undefined)
    return '0';
  return String(value);
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | undefined;
}) {
  const display = formatValue(value);
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{display || ''}</span>
    </div>
  );
}

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
}

function ReviewSection({ title, children }: ReviewSectionProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.sectionBody}>{children}</div>
    </div>
  );
}

function Review({
  formData,
  selectedTypes,
  onBack,
}: {
  formData: CIFReviewFormData;
  selectedTypes: CIFReviewSelectedTypes;
  onBack: () => void;
}) {
  const clientTypeLabel = selectedTypes.individual
    ? 'Individual'
    : selectedTypes.company
      ? 'Company'
      : selectedTypes.government
        ? 'Government'
        : selectedTypes.organization
          ? 'Organization'
          : '';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Information System - Review</h1>
        <Button variant="secondary" onClick={onBack}>
          Back to Edit
        </Button>
      </div>

      <div className={styles.content}>
        <ReviewSection title="Client Type">
          <ReviewRow label="Type" value={clientTypeLabel} />
        </ReviewSection>

        {selectedTypes.individual && (
          <ReviewSection title="Individual - Basic Information">
            <div className={styles.grid}>
              <ReviewRow label="Title" value={formData.title} />
              <ReviewRow label="Last Name" value={formData.lastName} />
              <ReviewRow label="First Name" value={formData.firstName} />
              <ReviewRow label="Middle Name" value={formData.middleName} />
              <ReviewRow label="Suffix" value={formData.suffix} />
              <ReviewRow label="Gender" value={formData.gender} />
              <ReviewRow
                label="Marital Status"
                value={formData.maritalStatus}
              />
              <ReviewRow label="Birth Date" value={formData.birthDate} />
              <ReviewRow label="Age" value={formData.age} />
              <ReviewRow label="Birth Place" value={formData.birthPlace} />
              <ReviewRow label="Nationality" value={formData.nationality} />
              <ReviewRow label="Previous Name" value={formData.previousName} />
              <ReviewRow label="Nick Name" value={formData.nickName} />
              <ReviewRow label="Blood Type" value={formData.bloodType} />
              <ReviewRow label="Weight" value={formData.weight} />
              <ReviewRow label="Height" value={formData.height} />
              <ReviewRow label="Is Deceased" value={formData.isDeceased} />
              <ReviewRow
                label="Is Beneficiary"
                value={formData.isBeneficiary}
              />
              <ReviewRow
                label="Primary Beneficiary"
                value={formData.primaryBeneficiary}
              />
              <ReviewRow label="Education" value={formData.education} />
              <ReviewRow label="School Level" value={formData.schoolLevel} />
              <ReviewRow
                label="Elementary Dependents"
                value={formData.elementaryDependents}
              />
              <ReviewRow
                label="High School Dependents"
                value={formData.highSchoolDependents}
              />
              <ReviewRow
                label="College Dependents"
                value={formData.collegeDependents}
              />
              <ReviewRow
                label="No. of Dependents"
                value={formData.noOfDependents}
              />
              <ReviewRow
                label="Number of Cars Owned"
                value={formData.numberOfCarsOwned}
              />
            </div>
          </ReviewSection>
        )}

        {selectedTypes.company && (
          <ReviewSection title="Company - Basic Information">
            <div className={styles.grid}>
              <ReviewRow label="Company Type" value={formData.companyType} />
              <ReviewRow label="Company Name" value={formData.companyName} />
              <ReviewRow
                label="Registered Name"
                value={formData.registeredName}
              />
              <ReviewRow label="TIN" value={formData.tin} />
              <ReviewRow
                label="Start of Business"
                value={formData.startOfBusiness}
              />
              <ReviewRow
                label="Number of Employees"
                value={formData.numberOfEmployees}
              />
              <ReviewRow label="Trader 1" value={formData.trader1} />
              <ReviewRow label="Trader 2" value={formData.trader2} />
              <ReviewRow label="Firm Size" value={formData.firmSize} />
              <ReviewRow
                label="Conglomerate Domain"
                value={formData.conglomerateDomain}
              />
              <ReviewRow
                label="Entity Location"
                value={formData.entityLocation}
              />
              <ReviewRow
                label="Country of Origin"
                value={formData.countryOfOrigin}
              />
              <ReviewRow
                label="Place of Registration"
                value={formData.placeOfRegistration}
              />
              <ReviewRow label="Legal Form" value={formData.legalForm} />
              <ReviewRow
                label="Company Industry"
                value={formData.companyIndustry}
              />
              <ReviewRow
                label="Origin of Entity"
                value={formData.originOfEntity}
              />
              <ReviewRow
                label="Company Business Activity"
                value={formData.companyBusinessActivity}
              />
              <ReviewRow
                label="Net Taxable Income"
                value={formData.netTaxableIncome}
              />
              <ReviewRow
                label="Monthly Expenses"
                value={formData.monthlyExpenses}
              />
              <ReviewRow label="Parent Client" value={formData.parentClient} />
              <ReviewRow label="Role of Parent" value={formData.roleOfParent} />
              <ReviewRow
                label="Contact Person"
                value={formData.contactPerson}
              />
              <ReviewRow label="Designation" value={formData.designation} />
            </div>
          </ReviewSection>
        )}

        {selectedTypes.government && (
          <ReviewSection title="Government - Basic Information">
            <div className={styles.grid}>
              <ReviewRow label="Name" value={formData.companyName} />
              <ReviewRow
                label="Date Established"
                value={formData.startOfBusiness}
              />
              <ReviewRow
                label="Contact Person"
                value={formData.contactPerson}
              />
              <ReviewRow label="Designation" value={formData.designation} />
              <ReviewRow
                label="Country of Origin"
                value={formData.countryOfOrigin}
              />
              <ReviewRow
                label="Origin of Entity"
                value={formData.originOfEntity}
              />
              <ReviewRow
                label="Place of Registration"
                value={formData.placeOfRegistration}
              />
              <ReviewRow label="Legal Form" value={formData.legalForm} />
              <ReviewRow
                label="Business Activity"
                value={formData.companyBusinessActivity}
              />
            </div>
          </ReviewSection>
        )}

        {selectedTypes.organization && (
          <ReviewSection title="Organization - Basic Information">
            <div className={styles.grid}>
              <ReviewRow label="Name" value={formData.companyName} />
              <ReviewRow label="TIN" value={formData.tin} />
              <ReviewRow
                label="Date Established"
                value={formData.startOfBusiness}
              />
              <ReviewRow
                label="Contact Person"
                value={formData.contactPerson}
              />
              <ReviewRow label="Designation" value={formData.designation} />
              <ReviewRow label="Remarks" value={formData.organizationRemarks} />
              <ReviewRow
                label="Country of Origin"
                value={formData.countryOfOrigin}
              />
              <ReviewRow
                label="Entity Location"
                value={formData.entityLocation}
              />
              <ReviewRow label="Legal Form" value={formData.legalForm} />
              <ReviewRow
                label="Business Activity"
                value={formData.organizationBusinessActivity}
              />
              <ReviewRow
                label="Nationality"
                value={formData.organizationNationality}
              />
              <ReviewRow
                label="Origin of Entity"
                value={formData.originOfEntity}
              />
              <ReviewRow
                label="Place of Registration"
                value={formData.placeOfRegistration}
              />
            </div>
          </ReviewSection>
        )}

        <ReviewSection title="Contacts / Addresses / IDs">
          <div className={styles.grid}>
            <ReviewRow label="Primary Address" value={formData.address1Used} />
            <ReviewRow
              label="Secondary Address"
              value={formData.address2Used}
            />
            <ReviewRow label="Primary ID 1" value={formData.primaryID1} />
            <ReviewRow label="Primary ID 2" value={formData.primaryID2} />
            <ReviewRow label="Primary ID 3" value={formData.primaryID3} />
            <ReviewRow label="Secondary ID 1" value={formData.secondaryID1} />
            <ReviewRow label="Secondary ID 2" value={formData.secondaryID2} />
            <ReviewRow label="Secondary ID 3" value={formData.secondaryID3} />
            <ReviewRow
              label="Primary Contact"
              value={formData.primaryContact}
            />
            <ReviewRow
              label="Secondary Contact"
              value={formData.secondaryContact}
            />
            <ReviewRow
              label="Presented ID Type"
              value={formData.presentedIDType}
            />
            <ReviewRow
              label="ID No. Presented for AMLA"
              value={formData.idNoPresentedForAMLA}
            />
            <ReviewRow label="Country Code" value={formData.countryCode} />
            <ReviewRow label="Mobile Number" value={formData.mobileNumber} />
            <ReviewRow label="Email Address" value={formData.emailAddress} />
          </div>
        </ReviewSection>

        <ReviewSection title="Documents">
          <div className={styles.grid}>
            <ReviewRow
              label="Insufficient Information"
              value={formData.insufficientInformation}
            />
            <ReviewRow
              label="Insufficient Information Remarks"
              value={formData.insufficientInformationRemarks}
            />
            <ReviewRow
              label="Insufficient Documents"
              value={formData.insufficientDocuments}
            />
            <ReviewRow
              label="Insufficient Documents Remarks"
              value={formData.insufficientDocumentsRemarks}
            />
          </div>
        </ReviewSection>

        {!selectedTypes.company && (
          <>
            <ReviewSection title="Employment">
              <div className={styles.grid}>
                <ReviewRow label="Employee ID" value={formData.employeeID} />
                <ReviewRow label="Occupation" value={formData.occupation} />
                <ReviewRow label="Status" value={formData.status} />
                <ReviewRow label="Position" value={formData.position} />
                <ReviewRow
                  label="Inclusive Date"
                  value={formData.inclusiveDate}
                />
                <ReviewRow label="Start Date" value={formData.startDate} />
                <ReviewRow label="End Date" value={formData.endDate} />
                <ReviewRow
                  label="Length of Service"
                  value={formData.lengthOfService}
                />
                <ReviewRow
                  label="Company / Employer Name"
                  value={formData.companyEmployerName}
                />
                <ReviewRow label="Employer TIN" value={formData.employerTIN} />
                <ReviewRow
                  label="Employer Address"
                  value={formData.employerAddress}
                />
                <ReviewRow
                  label="Employer Contact Person"
                  value={formData.employerContactPerson}
                />
                <ReviewRow
                  label="Employer Contact No."
                  value={formData.employerContactNo}
                />
                <ReviewRow
                  label="Business Activities"
                  value={formData.businessActivities}
                />
                <ReviewRow label="Industry" value={formData.industry} />
              </div>
            </ReviewSection>

            <ReviewSection title="Business">
              <div className={styles.grid}>
                <ReviewRow
                  label="Business Name"
                  value={formData.businessName}
                />
                <ReviewRow
                  label="Business Activity"
                  value={formData.businessActivity}
                />
                <ReviewRow
                  label="Main Address"
                  value={formData.businessMainAddress}
                />
                <ReviewRow
                  label="Additional Address"
                  value={formData.businessAdditionalAddress}
                />
                <ReviewRow label="Business ID 1" value={formData.businessID1} />
                <ReviewRow label="Business ID 2" value={formData.businessID2} />
                <ReviewRow
                  label="Primary Contact"
                  value={formData.businessPrimaryContact}
                />
                <ReviewRow
                  label="Secondary Contact"
                  value={formData.businessSecondaryContact}
                />
                <ReviewRow
                  label="Other Business Name"
                  value={formData.otherBusinessName}
                />
                <ReviewRow
                  label="Other Business Activity"
                  value={formData.otherBusinessActivity}
                />
                <ReviewRow
                  label="Other Main Address"
                  value={formData.otherBusinessMainAddress}
                />
                <ReviewRow
                  label="Other Additional Address"
                  value={formData.otherBusinessAdditionalAddress}
                />
                <ReviewRow
                  label="Other Business ID 1"
                  value={formData.otherBusinessID1}
                />
                <ReviewRow
                  label="Other Business ID 2"
                  value={formData.otherBusinessID2}
                />
                <ReviewRow
                  label="Other Primary Contact"
                  value={formData.otherBusinessPrimaryContact}
                />
                <ReviewRow
                  label="Other Secondary Contact"
                  value={formData.otherBusinessSecondaryContact}
                />
              </div>
            </ReviewSection>
          </>
        )}

        <ReviewSection title="Financial">
          <div className={styles.grid}>
            <ReviewRow
              label="Salary Indicator"
              value={formData.salaryIndicator}
            />
            <ReviewRow label="Fund Source" value={formData.fundSource} />
            <ReviewRow label="Salary" value={formData.salary} />
            <ReviewRow label="Gross Income" value={formData.grossIncome} />
            <ReviewRow label="Other Income" value={formData.otherIncome} />
            <ReviewRow
              label="Other Income Source"
              value={formData.otherIncomeSource}
            />
            <ReviewRow
              label="Other Income Source Amount"
              value={formData.otherIncomeSourceAmount}
            />
            <ReviewRow
              label="Monthly Average Income"
              value={formData.monthlyAverageIncome}
            />
            <ReviewRow
              label="Large Exposure"
              value={formData.isLargeExposure}
            />
            <ReviewRow
              label="Microfinance Borrower"
              value={formData.isMicrofinanceBorrower}
            />
            <ReviewRow
              label="Regular Loan Borrower"
              value={formData.isRegularLoanBorrower}
            />
            <ReviewRow label="Comaker" value={formData.isComaker} />
            <ReviewRow
              label="Savings Account Depositor"
              value={formData.isSavingsAcctDepositor}
            />
            <ReviewRow
              label="Current Account Depositor"
              value={formData.isCurrentAcctDepositor}
            />
            <ReviewRow
              label="Time Deposit Depositor"
              value={formData.isTimeDepositDepositor}
            />
            <ReviewRow
              label="Special Savings Depositor"
              value={formData.isSpecialSavingsDepositor}
            />
            <ReviewRow
              label="Enforce Credit Limit"
              value={formData.enforceCreditLimit}
            />
            <ReviewRow
              label="Original Balance"
              value={formData.originalBalance}
            />
            <ReviewRow
              label="Outstanding Balance"
              value={formData.outstandingBalance}
            />
            <ReviewRow label="Pesonet" value={formData.pesonet} />
            <ReviewRow label="Instapay" value={formData.instapay} />
            <ReviewRow label="Mobile Wallet" value={formData.mobileWallet} />
          </div>
        </ReviewSection>

        <ReviewSection title="AMLA / Tags">
          <div className={styles.grid}>
            <ReviewRow
              label="Bank Employee Related"
              value={formData.isBankEmployeeRelated}
            />
            <ReviewRow
              label="Bank Employee Name"
              value={formData.bankEmployeeName}
            />
            <ReviewRow label="Relationship" value={formData.relationship} />
            <ReviewRow label="DOSRI" value={formData.dosri} />
            <ReviewRow label="Bank Employee" value={formData.isBankEmployee} />
            <ReviewRow label="Employee Type" value={formData.employeeType} />
            <ReviewRow label="PEP" value={formData.isPEP} />
            <ReviewRow label="PEP Position" value={formData.pepPosition} />
            <ReviewRow label="PEP Place" value={formData.pepPlace} />
            <ReviewRow label="PEP Term" value={formData.pepTerm} />
            <ReviewRow label="Watch Listed" value={formData.isWatchListed} />
            <ReviewRow
              label="Linked Account"
              value={formData.isLinkedAccount}
            />
            <ReviewRow label="Payee" value={formData.isPayee} />
            <ReviewRow label="Related Party" value={formData.relatedParty} />
            <ReviewRow label="Overall Score" value={formData.overallScore} />
            <ReviewRow label="Classification" value={formData.classification} />
            <ReviewRow
              label="Customer Due Diligence"
              value={formData.customerDueDiligence}
            />
          </div>
        </ReviewSection>

        <ReviewSection title="Remarks / Groupings">
          <div className={styles.grid}>
            <ReviewRow label="Group 1" value={formData.group1} />
            <ReviewRow label="Group 2" value={formData.group2} />
            <ReviewRow label="Group 3" value={formData.group3} />
            <ReviewRow label="Custom Use 1" value={formData.customUse1} />
            <ReviewRow label="Custom Use 2" value={formData.customUse2} />
            <ReviewRow label="Custom Use 3" value={formData.customUse3} />
            <ReviewRow label="Custom Use 4" value={formData.customUse4} />
            <ReviewRow label="Remarks" value={formData.remarks} />
            <ReviewRow label="Client Status" value={formData.clientStatus} />
            <ReviewRow
              label="Member Since Date"
              value={formData.memberSinceDate}
            />
            <ReviewRow
              label="Last Client Update"
              value={formData.lastClientUpdate}
            />
          </div>
        </ReviewSection>

        <ReviewSection title="Picture / Signature">
          <div className={styles.grid}>
            <ReviewRow
              label="Client Picture 1"
              value={formData.clientPicture1 ? 'Uploaded' : ''}
            />
            <ReviewRow
              label="Client Picture 2"
              value={formData.clientPicture2 ? 'Uploaded' : ''}
            />
            <ReviewRow
              label="Signature 1"
              value={formData.signaturePicture1 ? 'Uploaded' : ''}
            />
            <ReviewRow
              label="Signature 2"
              value={formData.signaturePicture2 ? 'Uploaded' : ''}
            />
          </div>
        </ReviewSection>
      </div>
    </div>
  );
}

const emptyFormData: CIFReviewFormData = {
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
  organizationRemarks: '',
  organizationBusinessActivity: '',
  organizationNationality: '',
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
  clientPicture1: '',
  clientPicture2: '',
  signaturePicture1: '',
  signaturePicture2: '',
};

const emptySelectedTypes: CIFReviewSelectedTypes = {
  individual: false,
  company: false,
  government: false,
  organization: false,
};

function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CIFReviewState | null;

  const formData = state?.formData ?? emptyFormData;
  const selectedTypes = state?.selectedTypes ?? emptySelectedTypes;

  const hasNoData =
    !state &&
    !selectedTypes.individual &&
    !selectedTypes.company &&
    !selectedTypes.government &&
    !selectedTypes.organization;

  if (hasNoData) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Client Information System - Review</h1>
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT)}
          >
            Go to Form
          </Button>
        </div>
        <div className={styles.content}>
          <p className={styles.emptyMessage}>
            Walang data na ire-review. Punan muna ang form sa Client Information
            System - New.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Review
      formData={formData}
      selectedTypes={selectedTypes}
      onBack={() =>
        navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT, {
          state: { formData, selectedTypes },
        })
      }
    />
  );
}

export default ReviewPage;
