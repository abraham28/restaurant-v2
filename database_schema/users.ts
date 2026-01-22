/**
 * Database Table/Collection: users
 *
 * Description: Stores admin user profiles.
 * The primary key is the user ID (typically mapped to authentication provider ID).
 * Users can read and update their own profile (except isAdmin field).
 * Admin users may read, update isAdmin, or delete any user profile.
 */

/**
 * User record structure in the database
 */
export interface UserDocument {
  /** Whether the user has admin privileges (required, boolean) */
  isAdmin: boolean;

  /** User's email address (optional, string) */
  email?: string;

  /** User's role (admin, delivery, cashier) - may be synced from another source (optional, string) */
  role?: 'admin' | 'delivery' | 'cashier' | null;

  /** Timestamp when the user profile was created (optional, number - milliseconds since epoch) */
  createdAt?: number;
}

/**
 * Example record:
 * {
 *   isAdmin: true,
 *   email: "admin@example.com",
 *   createdAt: 1705312200000
 * }
 *
 * Note: The user ID is the primary key for this table/collection and is NOT stored in the document itself.
 */
