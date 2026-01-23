/**
 * Database Table/Collection: cifClientRelation
 *
 * Description: Stores relationship information between clients and related entities.
 * This table extends the cifRelation table with additional relationship details.
 *
 * Primary Key: ID (unique identifier for each client relation record)
 */

/**
 * Client relation record structure in the database
 */
export interface CifClientRelationDocument {
  /** Reference to the primary client (required, string - foreign key to cifClient) */
  ClientID: string;

  /** Reference to the related client (required, string - foreign key to cifClient) */
  RelatedClientID: string;

  /** Type of relationship (required, string, e.g., "Beneficiary", "Spouse", "Child", "Parent") */
  RelationshipType: string;

  /** Relationship description (optional, string) */
  RelationshipDescription?: string;

  /** Whether this is a primary relationship (optional, boolean, default: false) */
  IsPrimary?: boolean;

  /** Whether this relationship is active (optional, boolean, default: true) */
  IsActive?: boolean;

  /** Timestamp when the relationship record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the relationship record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   ClientID: "client_123",
 *   RelatedClientID: "client_456",
 *   RelationshipType: "Beneficiary",
 *   RelationshipDescription: "Primary beneficiary",
 *   IsPrimary: true,
 *   IsActive: true,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The ID is the primary key for this table/collection and is NOT stored in the document itself.
 */
