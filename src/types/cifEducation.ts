/**
 * Database Table/Collection: cifEducation
 *
 * Description: Lookup table for education levels and qualifications.
 * This is a reference table used to standardize education values across the system.
 *
 * Primary Key: EducationID (unique identifier for each education record)
 */

/**
 * Education record structure in the database
 */
export interface CifEducationDocument {
  /** Education level description (required, string, e.g., "Elementary", "High School", "Bachelor's Degree", "Master's Degree") */
  EducationLongDesc: string;

  /** Short code for education level (optional, string, e.g., "ELEM", "HS", "BACHELORS", "MASTERS") */
  EducationCode?: string;

  /** Education level category (optional, string, e.g., "Elementary", "Secondary", "Tertiary", "Graduate") */
  EducationCategory?: string;

  /** Whether this education level is active/available for selection (optional, boolean, default: true) */
  IsActive?: boolean;

  /** Display order for sorting (optional, number) */
  DisplayOrder?: number;

  /** Timestamp when the education record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the education record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example records:
 * {
 *   EducationLongDesc: "Elementary",
 *   EducationCode: "ELEM",
 *   EducationCategory: "Elementary",
 *   IsActive: true,
 *   DisplayOrder: 1,
 *   createdAt: 1705312200000
 * }
 * {
 *   EducationLongDesc: "Bachelor's Degree",
 *   EducationCode: "BACHELORS",
 *   EducationCategory: "Tertiary",
 *   IsActive: true,
 *   DisplayOrder: 5,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The EducationID is the primary key for this table/collection and is NOT stored in the document itself.
 */
