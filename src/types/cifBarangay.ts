/**
 * Database Table/Collection: cifBarangay
 *
 * Description: Lookup table for barangays (smallest administrative division in the Philippines).
 * This is a reference table used to standardize barangay values across the system.
 *
 * Primary Key: BarangayID (unique identifier for each barangay)
 */

/**
 * Barangay record structure in the database
 */
export interface CifBarangayDocument {
  /** Barangay name (required, string) */
  Name: string;

  /** Barangay code (optional, string) */
  Code?: string;

  /** Reference to city lookup (optional, string - foreign key to cifCity) */
  CityID?: string;

  /** Whether this barangay is active/available for selection (optional, boolean, default: true) */
  IsActive?: boolean;

  /** Display order for sorting (optional, number) */
  DisplayOrder?: number;

  /** Timestamp when the barangay record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the barangay record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   Name: "Barangay 123",
 *   Code: "BRGY123",
 *   CityID: "city_quezon",
 *   IsActive: true,
 *   DisplayOrder: 1,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The BarangayID is the primary key for this table/collection and is NOT stored in the document itself.
 */
