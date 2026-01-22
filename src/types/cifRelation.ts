/**
 * Database Table/Collection: cifRelation
 *
 * Description: Stores relationships between clients (e.g., beneficiary relationships,
 * family relationships, business relationships). This table links clients to other clients
 * and defines the nature of their relationship.
 *
 * Primary Key: RelationID (unique identifier for each relationship record)
 */

/**
 * Client relationship record structure in the database
 */
export interface CifRelationDocument {
  /** Reference to the primary client (required, string - foreign key to cifClient) */
  ClientID: string;

  /** Reference to the related client (required, string - foreign key to cifClient) */
  RelatedClientID: string;

  /** Type of relationship (required, string, e.g., "Beneficiary", "Spouse", "Child", "Parent", "Business Partner") */
  RelationshipType: string;

  /** Relationship description (optional, string) */
  RelationshipDescription?: string;

  /** Whether this is a primary beneficiary relationship (optional, boolean, default: false) */
  IsPrimaryBeneficiary?: boolean;

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
 *   IsPrimaryBeneficiary: true,
 *   IsActive: true,
 *   createdAt: 1705312200000
 * }
 *
 * Note: The RelationID is the primary key for this table/collection and is NOT stored in the document itself.
 */
