/**
 * LocalDB Store - General Purpose Storage
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

import { openDatabase, getStoreName, type DataRecord } from './base';

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
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

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
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);

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
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

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
