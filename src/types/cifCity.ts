/**
 * Database Table/Collection: cifCity
 *
 * Description: Lookup table for cities. This is a reference table used
 * to standardize city values across the system.
 *
 * Primary Key: CityID (unique identifier for each city)
 */

/**
 * City record structure in the database
 */
export interface CifCityDocument {
  /** City name (required, string) */
  Name: string;

  /** City code (optional, string) */
  Code?: string;

  /** Province/region (optional, string) */
  Province?: string;

  /** Whether this city is active/available for selection (optional, boolean, default: true) */
  IsActive?: boolean;

  /** Display order for sorting (optional, number) */
  DisplayOrder?: number;

  /** Timestamp when the city record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the city record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   Name: "Quezon City",
 *   Code: "QC",
 *   Province: "Metro Manila",
 *   IsActive: true,
 *   DisplayOrder: 1,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The CityID is the primary key for this table/collection and is NOT stored in the document itself.
 */
