/**
 * Database Table/Collection: cifIdentification
 *
 * Description: Stores identification document information for clients.
 * This table contains details about government-issued IDs, passports, and other
 * identification documents presented by clients.
 *
 * Primary Key: IdentificationID (unique identifier for each identification record)
 */

/**
 * Identification document record structure in the database
 */
export interface CifIdentificationDocument {
  /** Reference to the client (required, string - foreign key to cifClient) */
  ClientID: string;

  /** Identification number (required, string) */
  IdentificationNo: string;

  /** Date when the identification was issued (optional, Date) */
  IssuedDate?: Date;

  /** Organization/authority that issued the identification (optional, string) */
  IssuedBy?: string;

  /** Country where the identification was issued (optional, string) */
  CountryIssuedBy?: string;

  /** Reference to presented type lookup (optional, string - foreign key to presentedType) */
  PresentedTypeID?: string;

  /** Timestamp when the identification record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the identification record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   ClientID: "client_123",
 *   IdentificationNo: "A123456789",
 *   IssuedDate: "2020-01-15",
 *   IssuedBy: "Philippine Statistics Authority",
 *   CountryIssuedBy: "Philippines",
 *   PresentedTypeID: "presented_type_primary",
 *   createdAt: 1705312200000
 * }
 *
 * Note: The IdentificationID is the primary key for this table/collection and is NOT stored in the document itself.
 */
