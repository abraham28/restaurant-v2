/**
 * Database Table/Collection: cifAddressType
 *
 * Description: Lookup table for address types (e.g., Home, Office, Mailing, Business).
 * This is a reference table used to standardize address type values across the system.
 *
 * Primary Key: AddressTypeID (unique identifier for each address type)
 */

/**
 * Address type record structure in the database
 */
export interface CifAddressTypeDocument {
  /** Address type description (required, string, e.g., "Home", "Office", "Mailing", "Business") */
  TypeDesc: string;

  /** Full address type name (optional, string) */
  FullName?: string;

  /** Whether this address type is active/available for selection (optional, boolean, default: true) */
  IsActive?: boolean;

  /** Display order for sorting (optional, number) */
  DisplayOrder?: number;

  /** Timestamp when the address type record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the address type record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example records:
 * {
 *   TypeDesc: "Home",
 *   FullName: "Home Address",
 *   IsActive: true,
 *   DisplayOrder: 1,
 *   createdAt: 1705312200000
 * }
 * {
 *   TypeDesc: "Office",
 *   FullName: "Office Address",
 *   IsActive: true,
 *   DisplayOrder: 2,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The AddressTypeID is the primary key for this table/collection and is NOT stored in the document itself.
 */
