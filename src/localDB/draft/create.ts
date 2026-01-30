/**
 * Draft Create Operations
 *
 * Functions for creating and storing drafts
 */

import {
  openDatabase,
  getPrefixedKey,
  STORE_NAMES,
  type DataRecord,
} from '../base';
import { type DraftData } from './types';

/**
 * Store a draft with unique ID
 *
 * @param draftId - Unique identifier for the draft
 * @param formData - The form data to store
 * @param displayName - Display name for the draft (defaults to generated name)
 * @param category - Optional category/type for organizing drafts (e.g., "Form", "Document", "Order")
 * @returns Promise that resolves when draft is stored
 *
 * @example
 * await storeDraft('draft_123', formData, 'Sample Draft', 'Form');
 */
export async function storeDraft<T>(
  draftId: string,
  formData: T,
  displayName?: string,
  category?: string,
): Promise<void> {
  const db = await openDatabase();
  const storeName = STORE_NAMES.DRAFT;
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    // Normalize the key: getPrefixedKey handles both prefixed and non-prefixed IDs
    const prefixedKey = getPrefixedKey(STORE_NAMES.DRAFT, draftId);
    // Extract the raw ID for metadata (remove prefix if present)
    const prefix = `${STORE_NAMES.DRAFT}_`;
    const rawDraftId = draftId.startsWith(prefix)
      ? draftId.substring(prefix.length)
      : draftId;
    const getRequest = store.get(prefixedKey);

    getRequest.onsuccess = () => {
      const existing = getRequest.result as DataRecord | undefined;
      let createdAt = Date.now();
      let finalDisplayName = displayName || 'Untitled Draft';
      let finalCategory = category;

      if (existing && existing.value) {
        try {
          const existingDraft = JSON.parse(existing.value) as DraftData<T>;
          createdAt = existingDraft.metadata.createdAt;
          // Preserve existing displayName if not explicitly provided
          finalDisplayName =
            displayName ||
            existingDraft.metadata.displayName ||
            'Untitled Draft';
          // Preserve existing category if not explicitly provided
          if (!finalCategory && existingDraft.metadata.category) {
            finalCategory = existingDraft.metadata.category;
          }
        } catch (error) {
          // If parsing fails, use defaults
          console.error('Failed to parse existing draft:', error);
        }
      } else {
        // Generate display name if not provided and no existing draft
        if (!displayName) {
          finalDisplayName = `Draft ${new Date().toLocaleDateString()}`;
        }
      }

      const draftData: DraftData<T> = {
        id: rawDraftId,
        metadata: {
          id: rawDraftId,
          createdAt,
          updatedAt: Date.now(),
          displayName: finalDisplayName,
          category: finalCategory,
        },
        formData,
      };

      const value = JSON.stringify(draftData);
      const request = store.put({
        key: prefixedKey,
        value,
        updatedAt: Date.now(),
      });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(
          new Error(`Failed to store draft with ID "${draftId}" in IndexedDB`),
        );
      };
    };

    getRequest.onerror = () => {
      reject(new Error(`Failed to get existing draft "${draftId}"`));
    };
  });
}

/**
 * Generate a unique draft ID
 *
 * @returns A unique draft ID string
 *
 * @example
 * const draftId = generateDraftId(); // Returns something like "draft_1704067200000_abc123"
 */
export function generateDraftId(): string {
  return getPrefixedKey(
    STORE_NAMES.DRAFT,
    `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
  );
}
