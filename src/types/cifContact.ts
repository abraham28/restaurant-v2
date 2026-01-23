/**
 * Database Table/Collection: cifContact
 *
 * Description: Stores contact information for clients (phone numbers, email addresses, etc.).
 * This table contains various contact methods and their details.
 *
 * Primary Key: ContactID (unique identifier for each contact record)
 */

/**
 * Contact record structure in the database
 */
export interface CifContactDocument {
  /** Reference to the client (required, string - foreign key to cifClient) */
  ClientID: string;

  /** Reference to contact type lookup (optional, string - foreign key to contactType) */
  ContactTypeID?: string;

  /** Telecom provider name (optional, string, e.g., "Globe", "Smart", "PLDT") */
  TelcoName?: string;

  /** Contact value (phone number, email, etc.) (required, string) */
  Value: string;

  /** Whether this contact is registered for mobile banking (optional, boolean, default: false) */
  RegisterForMobileBanking?: boolean;

  /** Timestamp when the contact record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the contact record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   ClientID: "client_123",
 *   ContactTypeID: "contact_type_mobile",
 *   TelcoName: "Globe",
 *   Value: "+639171234567",
 *   RegisterForMobileBanking: true,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The ContactID is the primary key for this table/collection and is NOT stored in the document itself.
 */
