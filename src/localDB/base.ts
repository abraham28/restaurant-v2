/**
 * LocalDB Base Utilities
 *
 * Base utilities for IndexedDB operations used by all localDB modules.
 */

import { INDEXED_DB_CONSTANTS } from 'utils/constants';

// Destructure constants for easier use
const { DB_NAME, DB_VERSION, STORE_NAME } = INDEXED_DB_CONSTANTS;

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
 * Get the store name constant
 */
export function getStoreName(): string {
  return STORE_NAME;
}
