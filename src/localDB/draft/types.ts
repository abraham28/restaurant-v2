/**
 * Draft Types
 *
 * Type definitions for draft management operations
 */

/**
 * Draft metadata interface
 */
export interface DraftMetadata {
  id: string;
  createdAt: number;
  updatedAt: number;
  displayName: string; // Display name for the draft (e.g., "Sample Draft" or "Draft 1")
  category?: string; // Optional category/type for organizing drafts (e.g., "Form", "Document", "Order")
}

/**
 * Draft data structure stored in IndexedDB
 */
export interface DraftData<T> {
  id: string;
  metadata: DraftMetadata;
  formData: T;
}
