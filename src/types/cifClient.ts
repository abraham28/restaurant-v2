/**
 * Database Table/Collection: cifClient
 *
 * Description: Stores core client information for the Client Information System.
 * This is the main table containing individual client personal details, demographics,
 * and basic information.
 *
 * Primary Key: ClientID (unique identifier for each client)
 */

/**
 * Client record structure in the database
 */
export interface CifClientDocument {
  // Basic Information
  /** Client type (optional, string) */
  ClientType?: string;

  /** Reference to title lookup (optional, string - foreign key to cifTitle) */
  TitleID?: string;

  /** Client's last name (required, string) */
  LastName: string;

  /** Client's first name (required, string) */
  FirstName: string;

  /** Client's middle name (optional, string) */
  MiddleName?: string;

  /** Reference to name suffix lookup (optional, string - foreign key to cifClientNameSuffix) */
  SuffixID?: string;

  /** Client's gender (required, string: "Male" | "Female") */
  Gender: 'Male' | 'Female';

  /** Client's marital status (optional, string: "Single" | "Married" | "Divorced" | "Widowed") */
  MaritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';

  /** Client's birth date (required, Date) */
  BirthDate: Date;

  /** Client's age (calculated from BirthDate, number) */
  Age: number;

  /** Client's date of death (optional, Date) */
  DateOfDeath?: Date;

  /** Reference to client's birthplace municipality (optional, string - foreign key to municipality) */
  ClientBPMunicipalityID?: string;

  /** Reference to client's nationality (optional, string - foreign key to nationality lookup) */
  ClientNationalityID?: string;

  /** Client's previous/secondary name (optional, string) */
  SecondaryClientName?: string;

  /** Client's nickname (optional, string) */
  NickName?: string;

  /** Reference to education lookup (optional, string - foreign key to cifEducation) */
  EducationID?: string;

  /** Client's blood type (optional, string: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-") */
  BloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  /** Education level description (optional, string) */
  SchoolLevel?: string;

  /** Client's weight in kilograms (optional, number) */
  Weight?: number;

  /** Client's height in centimeters (optional, number) */
  Height?: number;

  /** Number of elementary school dependents (optional, number, default: 0) */
  ElementaryDependents?: number;

  /** Number of high school dependents (optional, number, default: 0) */
  HighSchoolDependents?: number;

  /** Number of college dependents (optional, number, default: 0) */
  CollegeDependents?: number;

  /** Total number of dependents (optional, number, default: 0) */
  NoOfDependents?: number;

  /** Number of cars owned by the client (optional, number, default: 0) */
  NumberOfCarsOwned?: number;

  // Address References
  /** Reference to primary address used by CIC (optional, string - foreign key to cifAddress) */
  Address1UsedByCIC?: string;

  /** Reference to secondary address used by CIC (optional, string - foreign key to cifAddress) */
  Address2UsedByCIC?: string;

  /** Client's residence class (optional, string) */
  ResidenceClass?: string;

  /** Client's risk rating (optional, string) */
  RiskRating?: string;

  // Identification References
  /** Reference to first identification document (optional, string - foreign key to cifIdentification) */
  IdentificationID1?: string;

  /** Reference to second identification document (optional, string - foreign key to cifIdentification) */
  IdentificationID2?: string;

  /** Reference to third identification document (optional, string - foreign key to cifIdentification) */
  IdentificationID3?: string;

  /** Reference to first secondary identification document (optional, string - foreign key to cifIdentification) */
  SecondaryIdentificationID1?: string;

  /** Reference to second secondary identification document (optional, string - foreign key to cifIdentification) */
  SecondaryIdentificationID2?: string;

  /** Reference to third secondary identification document (optional, string - foreign key to cifIdentification) */
  SecondaryIdentificationID3?: string;

  // Contact References
  /** Reference to first contact used by CIC (optional, string - foreign key to cifContact) */
  Contact1UsedByCIC?: string;

  /** Reference to second contact used by CIC (optional, string - foreign key to cifContact) */
  Contact2UsedByCIC?: string;

  // AMLA/Documentation
  /** Reference to presented ID type (optional, string - foreign key to ID type lookup) */
  PresentedIDTypeID?: string;

  /** IDs presented (optional, string) */
  IDsPresented?: string;

  /** Whether client has deficient information (optional, boolean, default: false) */
  DeficientInfo?: boolean;

  /** Remarks for deficient information (optional, string) */
  DeficientInfoRemarks?: string;

  /** Whether client has deficient documents submitted (optional, boolean, default: false) */
  DeficientDocSubmitted?: boolean;

  /** Remarks for deficient documents submitted (optional, string) */
  DeficientDocSubmittedRemarks?: string;

  // Employment Information
  /** Employee ID (optional, string) */
  EmployeeID?: string;

  /** Employer name (optional, string) */
  EmployerName?: string;

  /** Reference to occupation lookup (optional, string - foreign key to occupation) */
  OccupationID?: string;

  /** Reference to occupation status lookup (optional, string - foreign key to occupationStatus) */
  OccupationStatusID?: string;

  /** Reference to employment position lookup (optional, string - foreign key to employmentPosition) */
  EmploymentPositionID?: string;

  /** Employment start date (optional, Date) */
  EmploymentSinceDateTime?: Date;

  /** Date hired (optional, Date) */
  DateHired?: Date;

  /** Date hired to (optional, Date) */
  DateHiredto?: Date;

  /** Years of service in employment (optional, number) */
  EmploymentYearService?: number;

  /** Employer TIN (optional, string) */
  EmployerTIN?: string;

  /** Employer address (optional, string) */
  EmployerAddress?: string;

  /** Employer contact person (optional, string) */
  EmployerContactPerson?: string;

  /** Employer telephone number (optional, string) */
  EmployerTelNo?: string;

  /** Reference to business activity lookup (optional, string - foreign key to businessActivity) */
  BusinessActivityID?: string;

  /** Reference to employer industry lookup (optional, string - foreign key to employerIndustry) */
  EmployerIndustryID?: string;

  // Individual Business 1
  /** Individual business name (optional, string) */
  IndividualBusinessName?: string;

  /** Reference to individual business activity lookup (optional, string - foreign key to businessActivity) */
  IndividualBusinessActivityID?: string;

  /** Reference to individual business address 1 (optional, string - foreign key to cifAddress) */
  IndividualBusinessAddressID1?: string;

  /** Reference to individual business address 2 (optional, string - foreign key to cifAddress) */
  IndividualBusinessAddressID2?: string;

  /** Reference to individual business identification 1 (optional, string - foreign key to cifIdentification) */
  IndividualBusinessIdentificationID1?: string;

  /** Reference to individual business identification 2 (optional, string - foreign key to cifIdentification) */
  IndividualBusinessIdentificationID2?: string;

  /** Reference to individual business contact 1 (optional, string - foreign key to cifContact) */
  IndividualBusinessContactID1?: string;

  /** Reference to individual business contact 2 (optional, string - foreign key to cifContact) */
  IndividualBusinessContactID2?: string;

  // Individual Business 2
  /** Individual business 2 name (optional, string) */
  IndividualBusiness2Name?: string;

  /** Reference to individual business 2 activity lookup (optional, string - foreign key to businessActivity) */
  IndividualBusiness2ActivityID?: string;

  /** Reference to individual business 2 address 1 (optional, string - foreign key to cifAddress) */
  IndividualBusiness2AddressID1?: string;

  /** Reference to individual business 2 address 2 (optional, string - foreign key to cifAddress) */
  IndividualBusiness2AddressID2?: string;

  /** Reference to individual business 2 identification 1 (optional, string - foreign key to cifIdentification) */
  IndividualBusiness2IdentificationID1?: string;

  /** Reference to individual business 2 identification 2 (optional, string - foreign key to cifIdentification) */
  IndividualBusiness2IdentificationID2?: string;

  /** Reference to individual business 2 contact 1 (optional, string - foreign key to cifContact) */
  IndividualBusiness2ContactID1?: string;

  /** Reference to individual business 2 contact 2 (optional, string - foreign key to cifContact) */
  IndividualBusiness2ContactID2?: string;

  // Financial Information
  /** Salary indicator (optional, boolean, default: false) */
  SalaryIndicator?: boolean;

  /** Reference to source of fund lookup (optional, string - foreign key to sourceOfFund) */
  SourceOfFundID?: string;

  /** Client's salary (optional, number) */
  Salary?: number;

  /** Client's gross income (optional, number) */
  GrossIncome?: number;

  /** Client's other income (optional, number) */
  OtherIncome?: number;

  /** Description of other source of income (optional, string) */
  OtherSourceOfIncomeDesc?: string;

  /** Other source of income (optional, number) */
  OtherSourceOfIncome?: number;

  /** Monthly average income (optional, number) */
  MonthlyAverageIncome?: number;

  /** Large exposure indicator (optional, boolean, default: false) */
  LargeExposure?: boolean;

  // Client Type Indicators
  /** Whether client is a microfinance borrower (optional, boolean, default: false) */
  isMicrofinanceBorrower?: boolean;

  /** Whether client is a regular loan borrower (optional, boolean, default: false) */
  isRegularLoanBorrower?: boolean;

  /** Whether client is a comaker (optional, boolean, default: false) */
  isComaker?: boolean;

  /** Whether client is a savings account depositor (optional, boolean, default: false) */
  isSADepositor?: boolean;

  /** Whether client is a current account depositor (optional, boolean, default: false) */
  isCADepositor?: boolean;

  /** Whether client is a CTD depositor (optional, boolean, default: false) */
  isCTDDepositor?: boolean;

  /** Whether client is a SSD depositor (optional, boolean, default: false) */
  isSSDDepositor?: boolean;

  // Credit Information
  /** Whether to enforce credit limit (optional, boolean, default: false) */
  EnforceCreditLimit?: boolean;

  /** Credit line original amount (optional, number) */
  CreditLineOriginal?: number;

  /** Credit line balance (optional, number) */
  CreditLineBalance?: number;

  // Transaction Limits
  /** Maximum peso net daily transaction (optional, number) */
  Max_PesoNetDailyTran?: number;

  /** Maximum InstaPay daily transaction (optional, number) */
  Max_InstaPayDailyTran?: number;

  /** Maximum mobile wallet daily transaction (optional, number) */
  Max_MobileWalletDailyTran?: number;

  // Additional Client Information
  /** ERA indicator (optional, boolean, default: false) */
  ERA?: boolean;

  /** DOSRI indicator (optional, boolean, default: false) */
  DOSRI?: boolean;

  /** Reference to user who created/updated (optional, string - foreign key to secUser) */
  UserID?: string;

  /** Whether client is an employee (optional, boolean, default: false) */
  isEmployee?: boolean;

  /** Reference to employee type lookup (optional, string - foreign key to employeeType) */
  EmployeeTypeID?: string;

  /** Reference to client relation (optional, string - foreign key to cifClientRelation) */
  cifClientRelationID?: string;

  // PEP (Politically Exposed Person) Information
  /** PEP position (optional, string) */
  PEPPosition?: string;

  /** PEP place (optional, string) */
  PEPPlace?: string;

  /** PEP term since date (optional, Date) */
  PEPTermSinceDateTime?: Date;

  /** Whether client is watchlisted (optional, boolean, default: false) */
  WatchListed?: boolean;

  /** Linked accounts (optional, string) */
  LinkedAccounts?: string;

  /** Whether client is a payee (optional, boolean, default: false) */
  isPayee?: boolean;

  /** RPT indicator domain (optional, string) */
  RPTIndicatorDomain?: string;

  // Risk Assessment
  /** Risk assessment score (optional, number) */
  RiskAssessmentScore?: number;

  /** Profile rank (optional, string) */
  ProfileRank?: string;

  /** Customer due diligence (optional, string) */
  CustomerDueDiligence?: string;

  // Grouping and Classification
  /** Reference to group 1 lookup (optional, string) */
  Group1ID?: string;

  /** Reference to group 2 lookup (optional, string) */
  Group2ID?: string;

  /** Reference to group 3 lookup (optional, string) */
  Group3ID?: string;

  /** Other ID 1 (optional, string) */
  OtherID1?: string;

  /** Other ID 2 (optional, string) */
  OtherID2?: string;

  /** Other ID 3 (optional, string) */
  OtherID3?: string;

  /** Other ID 4 (optional, string) */
  OtherID4?: string;

  /** Client remarks (optional, string) */
  Remarks?: string;

  // Status and Timestamps
  /** Client status (optional, string) */
  ClientStatus?: string;

  /** Member since date (optional, Date) */
  MemberSinceDateTime?: Date;

  /** Last client update date (optional, Date) */
  LastClientUpdate?: Date;

  /** Whether this client is a primary beneficiary of another client (optional, boolean, default: false) */
  isBeneficiary?: boolean;

  /** Timestamp when the client record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the client record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   LastName: "Valencia",
 *   FirstName: "Juan Carlo",
 *   MiddleName: "Plaza",
 *   Gender: "Male",
 *   MaritalStatus: "Single",
 *   BirthDate: "1990-01-01",
 *   Age: 36,
 *   BirthPlace: "QUEZON CITY, METRO MANILA",
 *   Nationality: "Filipino",
 *   SecondaryClientName: "JC",
 *   NickName: "JC",
 *   BloodType: "O+",
 *   Weight: 85,
 *   Height: 177,
 *   IsDeceased: false,
 *   isBeneficiary: false,
 *   TitleID: "title_mr",
 *   createdAt: 1705312200000
 * }
 *
 * Note: The ClientID is the primary key for this table/collection and is NOT stored in the document itself.
 */
