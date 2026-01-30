// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  USERS: {
    TRANSLATIONS: (userId: string, lang: string) =>
      `/api/users/${userId}/translations?lang=${lang}`,
  },
};

// App Constants
export const DEFAULT_APP_NAME: string = 'Restaurant';

// UI Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  AUTH_CALLBACK: '/auth/callback',
  SAMPLE: {
    ROOT: '/sample',
    CREATE: '/sample/create',
    EDIT: '/sample/edit',
  },
  CSV_UTILS: {
    CSV_TO_JSON: '/csvutils/csvtojson',
  },
};

// Encryption Constants
export const ENCRYPTION_CONSTANTS = {
  APP_SALT: process.env.REACT_APP_ENCRYPTION_SALT || 'abrasoft-app-salt-2024',
  USER_SEED_KEY: 'user_encryption_seed',
};

// IndexedDB Constants
// Store names - centralized location for all IndexedDB store names
// Add new store names here as needed
const STORE_NAMES = {
  DRAFT: 'draft', // Store for draft operations
  CACHE: 'cache', // Store for cache operations
  TOKENS: 'tokens', // Store for tokens and general purpose storage
};

export const INDEXED_DB_CONSTANTS = {
  DB_NAME: 'abrasoft_db',
  DB_VERSION: 2, // Incremented to trigger database upgrade and create missing object stores
  STORE_NAMES,
  // Backward compatibility - references STORE_NAMES.TOKENS
  STORE_NAME: STORE_NAMES.TOKENS,
};
