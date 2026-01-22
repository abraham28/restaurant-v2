/**
 * Database Table/Collection: cifClientNameSuffix
 *
 * Description: Lookup table for client name suffixes (e.g., JR, SR, II, III, IV).
 * This is a reference table used to standardize suffix values across the system.
 *
 * Primary Key: SuffixID (unique identifier for each suffix)
 */

/**
 * Name suffix record structure in the database
 */
export interface CifClientNameSuffixDocument {
  /** Suffix code (required, string, e.g., "JR", "SR", "II", "III", "IV") */
  Suffix: string;

  /** Full suffix description (optional, string, e.g., "Junior", "Senior", "Second", "Third", "Fourth") */
  FullName?: string;

  /** Whether this suffix is active/available for selection (optional, boolean, default: true) */
  IsActive?: boolean;

  /** Display order for sorting (optional, number) */
  DisplayOrder?: number;

  /** Timestamp when the suffix record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the suffix record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example records:
 * {
 *   Suffix: "JR",
 *   FullName: "Junior",
 *   IsActive: true,
 *   DisplayOrder: 1,
 *   createdAt: 1705312200000
 * }
 * {
 *   Suffix: "SR",
 *   FullName: "Senior",
 *   IsActive: true,
 *   DisplayOrder: 2,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The SuffixID is the primary key for this table/collection and is NOT stored in the document itself.
 */
