// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    AUTHORIZE: '/auth/authorize',
    GOOGLE_AUTHORIZE: '/auth/google/authorize',
    TOKEN: '/auth/token',
    REVOKE: '/auth/revoke',
  },
  CATEGORY: '/category',
  CATEGORY_BATCH: '/category/batch',
  TRANSACTION: '/transactions',
  TRANSACTION_BATCH: '/transactions/batch',
  TRANSACTION_SALES: '/transactions/sales',
  TRANSACTION_EXPENSE: '/transactions/expense',
  SALES: '/sales',
  EXPENSES: '/expenses',
  USER: {
    PROFILE: '/user/profile',
  },
  COMPANY: '/company',
  COMPANY_MY_COMPANIES: '/company/my-companies',
  PRODUCT: '/products',
  PRODUCT_DRAFT: '/products/draft',
  INVENTORY: '/inventory',
  INVENTORY_HISTORY: '/inventory/history',
  INVENTORY_SOURCES: '/inventory-sources',
  PAYMENT_METHOD: '/payment-methods',
  CUSTOMERS: '/customers',
  SUPPLIERS: '/suppliers',
  REPORTS: {
    INCOME_STATEMENT: '/reports/income-statement',
    BALANCE_SHEET: '/reports/balance-sheet',
    CASH_FLOW_STATEMENT: '/reports/cash-flow-statement',
    GENERAL_LEDGER: '/reports/general-ledger',
    TRIAL_BALANCE: '/reports/trial-balance',
    GENERAL_JOURNAL: '/reports/general-journal',
  },
};

// UI Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  MENU: '/menu',
  LOGIN: '/login',
  LOGOUT: '/logout',
  ADMIN: '/admin',
  ADMIN_SETTINGS: '/admin/settings',
  SALES_REPORT: '/sales-report',
  SALES_LEDGER: '/sales-ledger',
  FORGOT_PASSWORD: '/forgot-password',
  AUTH_CALLBACK: '/auth/callback',
  CATEGORIES: {
    ROOT: '/categories',
  },
  TRANSACTIONS: {
    ROOT: '/transactions',
    ADD: '/transactions/add',
    SALES: '/transactions/sales',
    EXPENSE: '/transactions/expense',
    VIEW: '/transactions/:id',
    EDIT: '/transactions/:id/edit',
  },
  REPORTS: {
    ROOT: '/reports',
    INCOME_STATEMENT: '/reports/income-statement',
    BALANCE_SHEET: '/reports/balance-sheet',
    CASH_FLOW_STATEMENT: '/reports/cash-flow-statement',
    GENERAL_LEDGER: '/reports/general-ledger',
    TRIAL_BALANCE: '/reports/trial-balance',
    GENERAL_JOURNAL: '/reports/general-journal',
    INVENTORY_REPORT: '/reports/inventory',
  },
  USER: {
    PROFILE: '/user/profile',
    COMPLETE_PROFILE: '/user/complete-profile',
  },
  COMPANY: {
    LOBBY: '/company/lobby',
    USERS: '/company/users',
  },
  COMPANIES: {
    ROOT: '/companies',
  },
  PRODUCTS: {
    ROOT: '/products',
    ADD: '/products/add',
    EDIT: '/products/:id/edit',
    INVENTORY: '/products/:id/inventory',
  },
  INVENTORY: {
    ROOT: '/inventory',
    PRODUCT: '/inventory/:id',
    ADD: '/inventory/add',
    SOURCES: '/inventory/sources',
  },
  PAYMENT_METHODS: {
    ROOT: '/payment-methods',
  },
  CART: '/cart',
  CHECKOUT: '/checkout',
  MY_ORDERS: '/my-orders',
  WELCOME: '/welcome',
  SALES: {
    ROOT: '/sales',
    ADD: '/sales/add',
    VIEW: '/sales/:id',
  },
  ORDERS: {
    ROOT: '/orders',
  },
  DELIVERY_PORTAL: '/delivery-portal',
  DELIVERY_MANUAL_ORDER: '/delivery-manual-order',
  CASHIER_PORTAL: '/cashier-portal',
  CASHIER_PAYMENT: '/cashier-payment',
  CASHIER_ORDERS: '/cashier-orders',
  CASHIER_TURNOVER: '/cashier-turnover',
  PRINTER_SETUP: '/printer-setup',
  USER_MANAGEMENT: '/user-management',
  CASH_IN_AND_OUT: {
    ROOT: '/cash-in-and-out',
  },
  CASHIER_SESSIONS: {
    ROOT: '/cashier-sessions',
    DETAIL: '/cashier-sessions/:sessionId',
    ORDERS: '/cashier-sessions/:sessionId/orders',
  },
  DELIVERY_CASH_IN_AND_OUT: {
    ROOT: '/delivery-cash-in-and-out',
  },
  DELIVERY_SESSIONS: {
    ROOT: '/delivery-sessions',
    DETAIL: '/delivery-sessions/:sessionId',
    ORDERS: '/delivery-sessions/:sessionId/orders',
  },
  DELIVERY_REPORT: '/admin/delivery-report',
  GENERAL_EXPENSES: {
    ROOT: '/general-expenses',
  },
  CUSTOMERS: {
    ROOT: '/customers',
  },
  SUPPLIERS: {
    ROOT: '/suppliers',
  },
  POS: {
    ROOT: '/pos',
    PAYMENT: '/pos/payment',
    SUCCESS: '/pos/success',
  },
  FINANCIAL_PLANNING: {
    ROOT: '/financial-planning',
    LIABILITIES: '/financial-planning/liabilities',
    EXPENSES: '/financial-planning/expenses',
    MONTHLY_VIEW: '/financial-planning/month/:month',
  },
  CLIENT_INFORMATION_SYSTEM: {
    ROOT: '/client-information-system',
    INSERT: '/client-information-system/insert',
  },
};

// Authentication Constants
export const AUTH_CONSTANTS = {
  // Storage keys
  CODE_VERIFIER_KEY: 'oauth_code_verifier',
  STATE_KEY: 'oauth_state',
  RETURN_PATH_KEY: 'oauth_return_path',
  ACCESS_TOKEN_STORAGE_KEY: 'tkn',
  // Client configuration
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID || 'my_app',
  API_BASE_URL: process.env.REACT_APP_API_URL || '',
};

export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile_cache_v1',
  ACTIVE_COMPANY_ID: 'active_company_id_cache_v1',
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
  DB_NAME: 'abrasoft_auth_db',
  DB_VERSION: 1,
  STORE_NAME: 'tokens',
};

export const POS_ACCREDITATION_DETAILS = {
  PROVIDER_NAME: 'Abrasoft I.T. Services',
  PROVIDER_ADDRESS: 'Bankers Village 1, Brgy 171, Caloocan City',
  PROVIDER_TIN: '479-870-660-00000',
  PROVIDER_TIN_STATUS: 'Non-VAT Registered',
  ACCREDITATION_NUMBER: 'XXXXXXXX',
  ACCREDITATION_DATE_ISSUED: 'Pending accreditation date',
  ACCREDITATION_VALID_UNTIL: 'Pending validity date',
  PTU_NUMBER: 'Pending PTU assignment',
  PTU_DATE_ISSUED: 'Pending PTU issuance date',
} as const;
