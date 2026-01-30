/**
 * Draft Read Operations
 *
 * Functions for reading and retrieving drafts
 */

import { openDatabase, getStoreName, type DataRecord } from '../base';
import { type DraftData, type DraftMetadata } from './types';

/**
 * Get a specific draft by ID
 *
 * @param draftId - Unique identifier for the draft
 * @returns Promise that resolves with the draft data or null if not found
 *
 * @example
 * const draft = await getDraft<FormData>('draft_123');
 */
export async function getDraft<T>(
  draftId: string,
): Promise<DraftData<T> | null> {
  const db = await openDatabase();
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);

  return new Promise<DraftData<T> | null>((resolve, reject) => {
    const request = store.get(`draft_${draftId}`);

    request.onsuccess = () => {
      const result = request.result as DataRecord | undefined;
      if (result && result.value) {
        try {
          const draftData = JSON.parse(result.value) as DraftData<T>;
          resolve(draftData);
        } catch {
          reject(
            new Error(
              `Failed to parse draft with ID "${draftId}" from IndexedDB`,
            ),
          );
        }
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(
        new Error(`Failed to get draft with ID "${draftId}" from IndexedDB`),
      );
    };
  });
}

/**
 * Get all drafts
 *
 * @returns Promise that resolves with array of draft metadata
 *
 * @example
 * const drafts = await getAllDrafts();
 */
export async function getAllDrafts(): Promise<DraftMetadata[]> {
  const db = await openDatabase();
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);

  return new Promise<DraftMetadata[]>((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      const results = request.result as DataRecord[];
      const drafts: DraftMetadata[] = [];

      for (const record of results) {
        // Only process draft keys
        if (record.key.startsWith('draft_')) {
          try {
            const draftData = JSON.parse(record.value) as DraftData<unknown>;
            drafts.push(draftData.metadata);
          } catch {
            // Skip invalid drafts
            continue;
          }
        }
      }

      // Sort by updatedAt descending (newest first)
      drafts.sort((a, b) => b.updatedAt - a.updatedAt);
      resolve(drafts);
    };

    request.onerror = () => {
      reject(new Error('Failed to get all drafts from IndexedDB'));
    };
  });
}
