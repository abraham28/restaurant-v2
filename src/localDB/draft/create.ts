/**
 * Draft Create Operations
 *
 * Functions for creating and storing drafts
 */

import { openDatabase, getStoreName, type DataRecord } from '../base';
import { type DraftData } from './types';

/**
 * Store a draft with unique ID
 *
 * @param draftId - Unique identifier for the draft
 * @param formData - The form data to store
 * @param clientName - Display name for the draft (defaults to generated name)
 * @param clientType - Client type: 'Individual', 'Company', 'Government', 'Organization' (optional, will be inferred if not provided)
 * @returns Promise that resolves when draft is stored
 *
 * @example
 * await storeDraft('draft_123', formData, 'Juan Dela Cruz', 'Individual');
 */
export async function storeDraft<T>(
  draftId: string,
  formData: T,
  clientName?: string,
  clientType?: string,
): Promise<void> {
  const db = await openDatabase();
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    // Get existing draft if it exists to preserve createdAt
    const getRequest = store.get(`draft_${draftId}`);

    getRequest.onsuccess = () => {
      const existing = getRequest.result as DataRecord | undefined;
      let createdAt = Date.now();
      let displayName = clientName || 'Untitled Draft';
      let draftClientType = clientType;

      if (existing && existing.value) {
        try {
          const existingDraft = JSON.parse(existing.value) as DraftData<T>;
          createdAt = existingDraft.metadata.createdAt;
          displayName = clientName || existingDraft.metadata.clientName;
          // Preserve existing clientType if not explicitly provided
          if (!draftClientType && existingDraft.metadata.clientType) {
            draftClientType = existingDraft.metadata.clientType;
          }
        } catch {
          // If parsing fails, use defaults
        }
      } else {
        // Generate display name if not provided and no existing draft
        if (!clientName) {
          const nameParts: string[] = [];
          const data = formData as Record<string, unknown>;
          const firstName = data.firstName;
          const lastName = data.lastName;
          const companyName = data.companyName;

          // If companyName exists, it's likely a Company draft
          if (
            !draftClientType &&
            companyName &&
            typeof companyName === 'string' &&
            companyName.trim()
          ) {
            draftClientType = 'Company';
          }

          if (firstName && typeof firstName === 'string') {
            nameParts.push(firstName);
          }
          if (lastName && typeof lastName === 'string') {
            nameParts.push(lastName);
          }
          // If no firstName/lastName but has companyName, use companyName
          if (
            nameParts.length === 0 &&
            companyName &&
            typeof companyName === 'string'
          ) {
            nameParts.push(companyName);
          }
          displayName =
            nameParts.length > 0
              ? nameParts.join(' ')
              : `Draft ${new Date().toLocaleDateString()}`;
        }
      }

      // Default to 'Individual' if clientType is still not determined
      if (!draftClientType) {
        draftClientType = 'Individual';
      }

      const draftData: DraftData<T> = {
        id: draftId,
        metadata: {
          id: draftId,
          createdAt,
          updatedAt: Date.now(),
          clientName: displayName,
          clientType: draftClientType,
        },
        formData,
      };

      const value = JSON.stringify(draftData);
      const request = store.put({
        key: `draft_${draftId}`,
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
  return `draft_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
