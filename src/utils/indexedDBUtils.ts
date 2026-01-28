/**
 * IndexedDB Utilities - General Purpose Storage
 *
 * This module provides a general-purpose interface for storing and retrieving data
 * in IndexedDB. It can be used for any type of data storage needs including:
 * - Authentication tokens
 * - Form data persistence
 * - User preferences
 * - Cache data
 * - Any other client-side data that needs persistence
 *
 * USAGE EXAMPLES:
 *
 * 1. Store any data:
 *    await storeData('my_key', { name: 'John', age: 30 });
 *
 * 2. Retrieve data:
 *    const data = await getData<{ name: string; age: number }>('my_key');
 *
 * 3. Remove data:
 *    await removeData('my_key');
 *
 * 4. Store string data (for tokens):
 *    await storeData('refresh_token', 'encrypted_token_string');
 *    const token = await getData<string>('refresh_token');
 *
 * 5. Store complex objects (for form data):
 *    await storeData('client_form_data', formDataObject);
 *    const formData = await getData<FormData>('client_form_data');
 *
 * NOTE: All data is automatically serialized/deserialized using JSON.stringify/parse.
 * For string values, they are stored as-is without double-encoding.
 */

import { INDEXED_DB_CONSTANTS } from './constants';

// Destructure constants for easier use
const { DB_NAME, DB_VERSION, STORE_NAME } = INDEXED_DB_CONSTANTS;

interface DBInstance {
  db: IDBDatabase | null;
  promise: Promise<IDBDatabase> | null;
}

/**
 * Data record structure stored in IndexedDB
 */
interface DataRecord {
  key: string;
  value: string; // Stored as JSON string
  updatedAt: number;
}

const dbInstance: DBInstance = {
  db: null,
  promise: null,
};

/**
 * Open IndexedDB database
 */
function openDatabase(): Promise<IDBDatabase> {
  // Return existing database if available
  if (dbInstance.db) {
    return Promise.resolve(dbInstance.db);
  }

  // Return existing promise if database is being opened
  if (dbInstance.promise) {
    return dbInstance.promise;
  }

  // Create new promise to open database
  dbInstance.promise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      dbInstance.promise = null;
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      dbInstance.db = request.result;
      dbInstance.promise = null;
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
  });

  return dbInstance.promise;
}

/**
 * ============================================================================
 * GENERIC FUNCTIONS - Use these for any type of data storage
 * ============================================================================
 */

/**
 * Store data in IndexedDB with a given key
 *
 * @param key - Unique identifier for the data
 * @param data - Data to store (can be any serializable type: object, string, number, etc.)
 * @returns Promise that resolves when data is stored
 *
 * @example
 * await storeData('user_preferences', { theme: 'dark', language: 'en' });
 * await storeData('cache_key', { items: [1, 2, 3] });
 */
export async function storeData<T>(key: string, data: T): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    // Serialize data to JSON string
    // If data is already a string, store it as-is (no double encoding)
    const value = typeof data === 'string' ? data : JSON.stringify(data);

    const request = store.put({
      key,
      value,
      updatedAt: Date.now(),
    });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(new Error(`Failed to store data with key "${key}" in IndexedDB`));
    };
  });
}

/**
 * Get data from IndexedDB by key
 *
 * @param key - Unique identifier for the data
 * @returns Promise that resolves with the data or null if not found
 *
 * @example
 * const preferences = await getData<{ theme: string }>('user_preferences');
 * const token = await getData<string>('refresh_token');
 */
export async function getData<T>(key: string): Promise<T | null> {
  const db = await openDatabase();
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise<T | null>((resolve, reject) => {
    const request = store.get(key);

    request.onsuccess = () => {
      const result = request.result as DataRecord | undefined;
      if (result && result.value) {
        try {
          // Try to parse as JSON, if it fails assume it's a plain string
          let parsedData: T;
          try {
            parsedData = JSON.parse(result.value) as T;
          } catch {
            // If parsing fails, it's likely a plain string value
            parsedData = result.value as T;
          }
          resolve(parsedData);
        } catch {
          reject(
            new Error(`Failed to parse data with key "${key}" from IndexedDB`),
          );
        }
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(new Error(`Failed to get data with key "${key}" from IndexedDB`));
    };
  });
}

/**
 * Remove data from IndexedDB by key
 *
 * @param key - Unique identifier for the data to remove
 * @returns Promise that resolves when data is removed
 *
 * @example
 * await removeData('user_preferences');
 * await removeData('cache_key');
 */
export async function removeData(key: string): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.delete(key);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(
        new Error(`Failed to remove data with key "${key}" from IndexedDB`),
      );
    };
  });
}

/**
 * ============================================================================
 * CONVENIENCE FUNCTIONS - Specific use cases (backward compatibility)
 * ============================================================================
 */

/**
 * Store encrypted refresh token in IndexedDB
 * @deprecated Use storeData('refresh_token', token) instead
 */
export async function storeRefreshToken(encryptedToken: string): Promise<void> {
  return storeData('refresh_token', encryptedToken);
}

/**
 * Get encrypted refresh token from IndexedDB
 * @deprecated Use getData<string>('refresh_token') instead
 */
export async function getRefreshToken(): Promise<string | null> {
  return getData<string>('refresh_token');
}

/**
 * Remove refresh token from IndexedDB
 * @deprecated Use removeData('refresh_token') instead
 */
export async function removeRefreshToken(): Promise<void> {
  return removeData('refresh_token');
}

/**
 * ============================================================================
 * CLIENT FORM DATA FUNCTIONS - Specific use case for form persistence
 * ============================================================================
 */

/**
 * Store client form data in IndexedDB
 *
 * @param formData - The form data object to store
 * @returns Promise that resolves when data is stored
 *
 * @example
 * await storeClientFormData(formDataObject);
 */
export async function storeClientFormData<T>(formData: T): Promise<void> {
  return storeData('client_form_data', formData);
}

/**
 * Get client form data from IndexedDB
 *
 * @returns Promise that resolves with the form data or null if not found
 *
 * @example
 * const formData = await getClientFormData<FormData>();
 */
export async function getClientFormData<T>(): Promise<T | null> {
  return getData<T>('client_form_data');
}

/**
 * Remove client form data from IndexedDB
 *
 * @returns Promise that resolves when data is removed
 *
 * @example
 * await removeClientFormData();
 */
export async function removeClientFormData(): Promise<void> {
  return removeData('client_form_data');
}

/**
 * Clear all data from IndexedDB (for logout)
 */
export async function clearDatabase(): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(new Error('Failed to clear IndexedDB'));
    };
  });
}

/**
 * ============================================================================
 * DRAFT MANAGEMENT FUNCTIONS - For managing multiple client form drafts
 * ============================================================================
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
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

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
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);

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
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);

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
  return removeData(`draft_${draftId}`);
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
