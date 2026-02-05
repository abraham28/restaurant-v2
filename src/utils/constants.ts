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
export const DEFAULT_APP_NAME: string = 'Core Banking';

// UI Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  AUTH_CALLBACK: '/auth/callback',
  CLIENT_INFORMATION_SYSTEM: {
    ROOT: '/client-information-system',
    DASHBOARD: '/client-information-system/dashboard',
    INSERT: '/client-information-system/new',
    REVIEW: '/client-information-system/new/review',
    CUSTOMER_DETAILS: '/client-information-system/customer-details',
    ACCOUNTS: '/client-information-system/accounts',
    SETTINGS: '/client-information-system/settings',
    AUDIT_LOG: '/client-information-system/audit-log',
    ASSESSMENT: '/client-information-system/assessment',
    BASIC_INFORMATION: '/client-information-system/basic-information',
  },
  DEPOSITS: '/deposits',
  LOANS: '/loans',
  GL: '/gl',
  REPORTS: {
    CIS: '/reports/cis',
    DEPOSITS: '/reports/deposits',
    LOANS: '/reports/loans',
    GL: '/reports/gl',
    DYNAMIC_QUERY: '/reports/dynamic-query',
  },
  REGULATORY: {
    BSP: '/regulatory/bsp',
    AMLA: '/regulatory/amla',
    PDIC: '/regulatory/pdic',
    CIC: '/regulatory/cic',
  },
  CSV_UTILS: {
    CSV_TO_JSON: '/csvutils/csvtojson',
  },
};

// Encryption Constants
export const ENCRYPTION_CONSTANTS = {
  APP_SALT:
    process.env.REACT_APP_ENCRYPTION_SALT ||
    'abrasoft-accounting-app-salt-2024',
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
