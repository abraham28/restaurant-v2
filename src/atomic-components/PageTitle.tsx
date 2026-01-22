import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const APP_NAME = 'core-banking';

// Map routes to page titles
const routeTitles: Record<string, string> = {
  '/': 'Menu',
  '/login': 'Sign In',
  '/forgot-password': 'Reset Password',
  '/menu': 'Menu',
  '/dashboard': 'Dashboard',
  '/categories': 'Categories',
  '/transactions': 'Transactions',
  '/transactions/add': 'Add Transaction',
  '/sales': 'Sales',
  '/sales/add': 'New Sale',
  '/cashier-expenses': 'Cashier Expenses',
  '/cashier-sessions': 'Cashier Sessions',
  '/reports': 'Reports',
  '/reports/income-statement': 'Income Statement',
  '/reports/balance-sheet': 'Balance Sheet',
  '/reports/cash-flow-statement': 'Cash Flow Statement',
  '/reports/general-ledger': 'General Ledger',
  '/reports/trial-balance': 'Trial Balance',
  '/reports/general-journal': 'General Journal',
  '/reports/inventory': 'Inventory Report',
  '/products': 'Products',
  '/products/add': 'Add Product',
  '/inventory': 'Inventory',
  '/inventory/add': 'Add Inventory',
  '/inventory/sources': 'Inventory Sources',
  '/payment-methods': 'Payment Methods',
  '/customers': 'Customers',
  '/suppliers': 'Suppliers',
  '/companies': 'Companies',
  '/company/lobby': 'Select Company',
  '/pos': 'Point of Sale',
  '/pos/payment': 'Payment',
  '/pos/success': 'Payment Success',
  '/user/profile': 'Profile',
  '/user/complete-profile': 'Complete Profile',
  '/my-orders': 'My Orders',
  '/financial-planning': 'Financial Planning',
  '/financial-planning/liabilities': 'Liabilities',
  '/financial-planning/expenses': 'Expenses',
  '/client-information-system': 'Client Information System',
  '/client-information-system/insert': 'Client Information System - Insert',
};

// Function to get title from path (handles dynamic routes like /sales/:id)
function getTitleFromPath(pathname: string): string {
  // Check exact match first
  if (routeTitles[pathname]) {
    return routeTitles[pathname];
  }

  // Handle dynamic routes
  if (pathname.startsWith('/sales/') && pathname !== '/sales/add') {
    return 'View Sale';
  }
  if (pathname.startsWith('/expenses/') && pathname !== '/expenses/add') {
    return 'View Expense';
  }
  if (pathname.startsWith('/transactions/') && !pathname.includes('/add')) {
    if (pathname.includes('/edit')) {
      return 'Edit Transaction';
    }
    return 'View Transaction';
  }
  if (pathname.startsWith('/products/') && !pathname.includes('/add')) {
    if (pathname.includes('/edit')) {
      return 'Edit Product';
    }
    if (pathname.includes('/inventory')) {
      return 'Product Inventory';
    }
  }
  if (
    pathname.startsWith('/inventory/') &&
    pathname !== '/inventory/add' &&
    pathname !== '/inventory/sources'
  ) {
    return 'Product Inventory';
  }
  if (pathname.startsWith('/financial-planning/month/')) {
    return 'Monthly Budget View';
  }

  // Default: use the last segment of the path
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1];
    // Capitalize first letter
    return (
      lastSegment.charAt(0).toUpperCase() +
      lastSegment.slice(1).replace(/-/g, ' ')
    );
  }

  return 'Page Not Found';
}

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const title = getTitleFromPath(location.pathname);
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [location.pathname]);

  return null; // This component doesn't render anything
}

export default PageTitle;
