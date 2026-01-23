/**
 * Database Table/Collection: cifAddress
 *
 * Description: Stores address information for clients. This table contains
 * physical addresses, mailing addresses, and other location-related data.
 *
 * Primary Key: AddressID (unique identifier for each address record)
 */

/**
 * Address record structure in the database
 */
export interface CifAddressDocument {
  /** Reference to the client (required, string - foreign key to cifClient) */
  ClientID: string;

  /** Reference to address type lookup (optional, string - foreign key to cifAddressType) */
  AddressTypeID?: string;

  /** Address line 1 (required, string) */
  Address1: string;

  /** Reference to subdivision lookup (optional, string - foreign key to cifSubdivision) */
  SubdivisionID?: string;

  /** Reference to city lookup (optional, string - foreign key to cifCity) */
  CityID?: string;

  /** Reference to barangay lookup (optional, string - foreign key to cifBarangay) */
  BarangayID?: string;

  /** ZIP code (optional, string) */
  ZipCode?: string;

  /** Date when client occupied this address (optional, Date) */
  OccupiedSince?: Date;

  /** Years in this address (optional, number) */
  YearsInThisAddress?: number;

  /** Complete address string (optional, string) */
  CompleteAddress?: string;

  /** Address remarks (optional, string) */
  Remarks?: string;

  /** Timestamp when the address record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the address record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   ClientID: "client_123",
 *   AddressTypeID: "address_type_home",
 *   Address1: "123 Main Street",
 *   SubdivisionID: "subdivision_abc",
 *   CityID: "city_quezon",
 *   BarangayID: "barangay_xyz",
 *   ZipCode: "1100",
 *   OccupiedSince: "2020-01-01",
 *   YearsInThisAddress: 4,
 *   CompleteAddress: "123 Main Street, Subdivision ABC, Quezon City, Metro Manila, 1100",
 *   createdAt: 1705312200000
 * }
 *
 * Note: The AddressID is the primary key for this table/collection and is NOT stored in the document itself.
 */
