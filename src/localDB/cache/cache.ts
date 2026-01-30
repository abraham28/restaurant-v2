/**
 * Cache Operations
 *
 * Functions for caching data in IndexedDB.
 * Used for caching CSV/JSON data and other cacheable resources.
 */

import { openDatabase, getStoreName, type DataRecord } from '../base';

/**
 * Store data in cache by key
 *
 * @param key - Unique cache key identifier
 * @param data - Data to cache (can be any serializable type)
 * @returns Promise that resolves when data is cached
 *
 * @example
 * await storeCache('csv_barangay', parsedData);
 * await storeCache('json_titles', jsonData);
 */
export async function storeCache<T>(key: string, data: T): Promise<void> {
  const db = await openDatabase();
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    // Serialize data to JSON string
    // If data is already a string, store it as-is (no double encoding)
    const value = typeof data === 'string' ? data : JSON.stringify(data);

    const request = store.put({
      key: `cache_${key}`,
      value,
      updatedAt: Date.now(),
    });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(new Error(`Failed to store cache with key "${key}" in IndexedDB`));
    };
  });
}

/**
 * Get cached data by key
 *
 * @param key - Unique cache key identifier
 * @returns Promise that resolves with the cached data or null if not found
 *
 * @example
 * const cached = await getCache<Record<string, string>[]>('csv_barangay');
 * const jsonData = await getCache<MyType[]>('json_titles');
 */
export async function getCache<T>(key: string): Promise<T | null> {
  const db = await openDatabase();
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);

  return new Promise<T | null>((resolve, reject) => {
    const request = store.get(`cache_${key}`);

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
            new Error(`Failed to parse cache with key "${key}" from IndexedDB`),
          );
        }
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(new Error(`Failed to get cache with key "${key}" from IndexedDB`));
    };
  });
}

/**
 * Remove cached data by key
 *
 * @param key - Unique cache key identifier
 * @returns Promise that resolves when cache is removed
 *
 * @example
 * await removeCache('csv_barangay');
 * await removeCache('json_titles');
 */
export async function removeCache(key: string): Promise<void> {
  const db = await openDatabase();
  const storeName = getStoreName();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.delete(`cache_${key}`);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(
        new Error(`Failed to remove cache with key "${key}" from IndexedDB`),
      );
    };
  });
}
