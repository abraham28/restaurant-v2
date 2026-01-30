/**
 * LocalDB Base Utilities
 *
 * Base utilities for IndexedDB operations used by all localDB modules.
 */

import { INDEXED_DB_CONSTANTS } from 'utils/constants';

// Destructure constants for easier use
const { DB_NAME, DB_VERSION, STORE_NAMES } = INDEXED_DB_CONSTANTS;

// Export store names for use in other modules
export { STORE_NAMES };

/**
 * Data record structure stored in IndexedDB
 */
export interface DataRecord {
  key: string;
  value: string; // Stored as JSON string
  updatedAt: number;
}

interface DBInstance {
  db: IDBDatabase | null;
  promise: Promise<IDBDatabase> | null;
}

const dbInstance: DBInstance = {
  db: null,
  promise: null,
};

/**
 * Open IndexedDB database
 * This is the base function used by all localDB modules
 */
export function openDatabase(): Promise<IDBDatabase> {
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
      const db = request.result;
      dbInstance.db = db;
      dbInstance.promise = null;

      // Clear cached instance when database closes (e.g., during upgrades)
      db.onclose = () => {
        dbInstance.db = null;
      };

      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create all object stores if they don't exist
      const stores = [STORE_NAMES.DRAFT, STORE_NAMES.CACHE, STORE_NAMES.TOKENS];
      for (const store of stores) {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: 'key' });
        }
      }
    };
  });

  return dbInstance.promise;
}

/**
 * Generate a prefixed key for IndexedDB storage
 * Uses the store name constant to create the prefix
 * If the ID already has the prefix, it returns it as-is
 *
 * @param storeName - The store name from STORE_NAMES constant
 * @param id - The ID or key to append to the prefix (may already be prefixed)
 * @returns The prefixed key string
 *
 * @example
 * getPrefixedKey(STORE_NAMES.DRAFT, '123') // Returns 'draft_123'
 * getPrefixedKey(STORE_NAMES.DRAFT, 'draft_123') // Returns 'draft_123' (no double prefix)
 * getPrefixedKey(STORE_NAMES.CACHE, 'barangay') // Returns 'cache_barangay'
 */
export function getPrefixedKey(storeName: string, id: string): string {
  const prefix = `${storeName}_`;
  return id.startsWith(prefix) ? id : `${prefix}${id}`;
}

/**
 * Check if a key starts with a store name prefix
 *
 * @param key - The key to check
 * @param storeName - The store name from STORE_NAMES constant
 * @returns True if the key starts with the store name prefix
 *
 * @example
 * keyStartsWith('draft_123', STORE_NAMES.DRAFT) // Returns true
 * keyStartsWith('cache_barangay', STORE_NAMES.CACHE) // Returns true
 */
export function keyStartsWith(key: string, storeName: string): boolean {
  return key.startsWith(`${storeName}_`);
}
