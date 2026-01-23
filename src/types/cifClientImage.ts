/**
 * Database Table/Collection: cifClientImage
 *
 * Description: Stores image files for clients (photos, signatures, etc.).
 * This table contains references to client pictures and signature images.
 *
 * Primary Key: ImageID (unique identifier for each image record)
 */

/**
 * Client image record structure in the database
 */
export interface CifClientImageDocument {
  /** Reference to the client (required, string - foreign key to cifClient) */
  ClientID: string;

  /** Client picture 1 (optional, string - file path or base64 encoded image) */
  ClientPicture1?: string;

  /** Client picture 2 (optional, string - file path or base64 encoded image) */
  ClientPicture2?: string;

  /** Signature picture 1 (optional, string - file path or base64 encoded image) */
  SignaturePicture1?: string;

  /** Signature picture 2 (optional, string - file path or base64 encoded image) */
  SignaturePicture2?: string;

  /** Timestamp when the image record was created (optional, number - milliseconds since epoch) */
  createdAt?: number;

  /** Timestamp when the image record was last updated (optional, number - milliseconds since epoch) */
  updatedAt?: number;
}

/**
 * Example record:
 * {
 *   ClientID: "client_123",
 *   ClientPicture1: "/uploads/clients/client_123/picture1.jpg",
 *   ClientPicture2: "/uploads/clients/client_123/picture2.jpg",
 *   SignaturePicture1: "/uploads/clients/client_123/signature1.jpg",
 *   SignaturePicture2: "/uploads/clients/client_123/signature2.jpg",
 *   createdAt: 1705312200000
 * }
 *
 * Note: The ImageID is the primary key for this table/collection and is NOT stored in the document itself.
 */
