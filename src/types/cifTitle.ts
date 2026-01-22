/**
 * Database Table/Collection: cifTitle
 *
 * Description: Lookup table for client titles (e.g., MR, MRS, MS, DR, etc.).
 * This is a reference table used to standardize title values across the system.
 *
 * Primary Key: TitleID (unique identifier for each title)
 */

/**
 * Title record structure in the database
 */
export interface CifTitleDocument {
  /** Title description/code (required, string, e.g., "MR", "MRS", "MS", "DR", "ENG", "ATTY") */
  Description: string;

  /** Full title name (optional, string, e.g., "Mister", "Missus", "Doctor") */
  FullName?: string;

  /** Whether this title is active/available for selection (optional, boolean, default: true) */
  IsActive?: boolean;

  /** Display order for sorting (optional, number) */
  DisplayOrder?: number;

  /** Timestamp when the title record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the title record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example records:
 * {
 *   Description: "MR",
 *   FullName: "Mister",
 *   IsActive: true,
 *   DisplayOrder: 1,
 *   createdAt: 1705312200000
 * }
 * {
 *   Description: "MRS",
 *   FullName: "Missus",
 *   IsActive: true,
 *   DisplayOrder: 2,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The TitleID is the primary key for this table/collection and is NOT stored in the document itself.
 */
