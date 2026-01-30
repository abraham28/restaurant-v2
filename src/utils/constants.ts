// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
  },
};

// UI Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  AUTH_CALLBACK: '/auth/callback',
  CLIENT_INFORMATION_SYSTEM: {
    ROOT: '/client-information-system',
    INSERT: '/client-information-system/insert',
    IDIVIDUAL_INSERT: '/client-information-system/individual/insert',
    COMPANY_INSERT: '/client-information-system/company/insert',
    GOVERNMENT_INSERT: '/client-information-system/government/insert',
    ORGANIZATION_INSERT: '/client-information-system/organization/insert',
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
export const INDEXED_DB_CONSTANTS = {
  DB_NAME: 'abrasoft_db',
  DB_VERSION: 1,
  STORE_NAME: 'tokens',
};
