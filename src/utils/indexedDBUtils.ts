/**
 * IndexedDB utilities for secure token storage
 */

import { INDEXED_DB_CONSTANTS } from './constants';

// Destructure constants for easier use
const { DB_NAME, DB_VERSION, STORE_NAME } = INDEXED_DB_CONSTANTS;

interface DBInstance {
  db: IDBDatabase | null;
  promise: Promise<IDBDatabase> | null;
}

interface TokenRecord {
  key: string;
  value: string;
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
 * Store encrypted refresh token in IndexedDB
 */
export async function storeRefreshToken(encryptedToken: string): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.put({
      key: 'refresh_token',
      value: encryptedToken,
      updatedAt: Date.now(),
    });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(new Error('Failed to store refresh token in IndexedDB'));
    };
  });
}

/**
 * Get encrypted refresh token from IndexedDB
 */
export async function getRefreshToken(): Promise<string | null> {
  const db = await openDatabase();
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise<string | null>((resolve, reject) => {
    const request = store.get('refresh_token');

    request.onsuccess = () => {
      const result = request.result as TokenRecord | undefined;
      if (result && result.value) {
        resolve(result.value);
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(new Error('Failed to get refresh token from IndexedDB'));
    };
  });
}

/**
 * Remove refresh token from IndexedDB
 */
export async function removeRefreshToken(): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.delete('refresh_token');

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(new Error('Failed to remove refresh token from IndexedDB'));
    };
  });
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
