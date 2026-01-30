/**
 * Draft Delete Operations
 *
 * Functions for deleting drafts
 */

import { openDatabase, getPrefixedKey, STORE_NAMES } from '../base';

/**
 * Delete a draft by ID
 *
 * @param draftId - Unique identifier for the draft to delete
 * @returns Promise that resolves when draft is deleted
 *
 * @example
 * await deleteDraft('draft_123');
 */
export async function deleteDraft(draftId: string): Promise<void> {
  const db = await openDatabase();
  const storeName = STORE_NAMES.DRAFT;
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.delete(getPrefixedKey(STORE_NAMES.DRAFT, draftId));

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(
        new Error(`Failed to delete draft with ID "${draftId}" from IndexedDB`),
      );
    };
  });
}
