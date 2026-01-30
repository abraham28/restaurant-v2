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
  clientName: string; // Display name (e.g., "Juan Dela Cruz" or "Draft 1")
  clientType?: string; // Client type: 'Individual', 'Company', 'Government', 'Organization'
}

/**
 * Draft data structure stored in IndexedDB
 */
export interface DraftData<T> {
  id: string;
  metadata: DraftMetadata;
  formData: T;
}
