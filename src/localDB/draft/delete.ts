/**
 * Draft Delete Operations
 *
 * Functions for deleting drafts
 */

import { openDatabase, getStoreName } from '../base';

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
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.delete(`draft_${draftId}`);

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
