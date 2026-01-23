/**
 * Database Table/Collection: cifSubdivision
 *
 * Description: Lookup table for subdivisions. This is a reference table used
 * to standardize subdivision values across the system.
 *
 * Primary Key: SubdivisionID (unique identifier for each subdivision)
 */

/**
 * Subdivision record structure in the database
 */
export interface CifSubdivisionDocument {
  /** Subdivision name (required, string) */
  Name: string;

  /** Subdivision code (optional, string) */
  Code?: string;

  /** Reference to city lookup (optional, string - foreign key to cifCity) */
  CityID?: string;

  /** Whether this subdivision is active/available for selection (optional, boolean, default: true) */
  IsActive?: boolean;

  /** Display order for sorting (optional, number) */
  DisplayOrder?: number;

  /** Timestamp when the subdivision record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the subdivision record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   Name: "Greenhills Subdivision",
 *   Code: "GH",
 *   CityID: "city_quezon",
 *   IsActive: true,
 *   DisplayOrder: 1,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The SubdivisionID is the primary key for this table/collection and is NOT stored in the document itself.
 */
