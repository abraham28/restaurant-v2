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
  /** Client's last name (required, string) */
  LastName: string;

  /** Client's first name (required, string) */
  FirstName: string;

  /** Client's middle name (optional, string) */
  MiddleName?: string;

  /** Client's gender (required, string: "Male" | "Female") */
  Gender: 'Male' | 'Female';

  /** Client's marital status (optional, string: "Single" | "Married" | "Divorced" | "Widowed") */
  MaritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';

  /** Client's birth date (required, string - ISO date format: YYYY-MM-DD) */
  BirthDate: Date;

  /** Client's age (calculated from BirthDate, number) */
  Age: number;

  /** Client's birthplace (optional, string) */
  BirthPlace?: string;

  /** Client's nationality (optional, string) */
  Nationality?: string;

  /** Client's previous/secondary name (optional, string) */
  SecondaryClientName?: string;

  /** Client's nickname (optional, string) */
  NickName?: string;

  /** Client's blood type (optional, string: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-") */
  BloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  /** Client's weight in kilograms (optional, number) */
  Weight?: number;

  /** Client's height in centimeters (optional, number) */
  Height?: number;

  /** Whether the client is deceased (optional, boolean, default: false) */
  IsDeceased?: boolean;

  /** Whether this client is a primary beneficiary of another client (optional, boolean, default: false) */
  isBeneficiary?: boolean;

  /** Education level description (optional, string) */
  SchoolLevel?: string;

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

  /** Reference to title lookup (optional, string - foreign key to cifTitle) */
  TitleID?: string;

  /** Reference to name suffix lookup (optional, string - foreign key to cifClientNameSuffix) */
  SuffixID?: string;

  /** Reference to education lookup (optional, string - foreign key to cifEducation) */
  EducationID?: string;

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
