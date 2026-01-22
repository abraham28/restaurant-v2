/**
 * CSV Import/Export Utilities
 * Provides reusable functions for CSV parsing, export, and import operations
 */

// Helper function to split CSV into lines, respecting quoted fields with newlines
export const splitCSVLines = (csvText: string): string[] => {
  const lines: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        current += char;
      }
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // End of line (only if not inside quotes)
      // Handle \r\n (Windows line endings)
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip \n
      }
      if (current.trim()) {
        lines.push(current);
      }
      current = '';
    } else if (char !== '\r') {
      // Skip standalone \r, add everything else
      current += char;
    }
  }
  // Add last line
  if (current.trim()) {
    lines.push(current);
  }
  return lines;
};

// Helper function to parse CSV line handling quoted cells
export const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of cell
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  // Add last cell
  result.push(current.trim());
  return result;
};

// Find the header row in CSV (looks for common column names)
export const findHeaderRow = (
  lines: string[],
  searchColumns: string[] = ['id', 'name', 'price'],
): number => {
  for (let i = 0; i < lines.length; i++) {
    const testHeaders = parseCSVLine(lines[i]).map((h) =>
      h.replace(/^"|"$/g, '').trim().toLowerCase(),
    );
    if (searchColumns.some((col) => testHeaders.includes(col))) {
      return i;
    }
  }
  return 0;
};

// Generic CSV export function
export const exportToCSV = (
  headers: string[],
  data: string[][],
  filename: string,
): void => {
  try {
    const rows: string[][] = [headers, ...data];

    // Convert to CSV string
    const csvContent = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','),
      )
      .join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Failed to export CSV',
    );
  }
};

// Product-specific types
export interface ProductCSVRow {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  active: boolean;
  category: string;
  availableOnCustomers: boolean;
  availableOnCashier: boolean;
  availableOnDelivery: boolean;
  image?: string;
}

export interface ProductImportResult {
  successCount: number;
  createCount: number;
  updateCount: number;
  errorCount: number;
  errors: Array<{ row: number; name: string; error: string }>;
}

// Parse products from CSV
export const parseProductsCSV = (
  text: string,
): { products: ProductCSVRow[]; errors: string[] } => {
  const errors: string[] = [];
  const products: ProductCSVRow[] = [];

  // Split into lines (respecting quoted fields)
  const lines = splitCSVLines(text);

  if (lines.length < 2) {
    throw new Error(
      'CSV file must have at least a header row and one data row',
    );
  }

  // Find the header row
  const headerRowIndex = findHeaderRow(lines, ['id', 'name', 'price']);

  // Parse header
  const headerLine = lines[headerRowIndex];
  const headers = parseCSVLine(headerLine).map((h) =>
    h.replace(/^"|"$/g, '').trim(),
  );

  // Find column indices
  const getColumnIndex = (headerName: string): number => {
    const lowerHeaderName = headerName.toLowerCase();
    return headers.findIndex((h) => h.toLowerCase() === lowerHeaderName);
  };

  const idIdx = getColumnIndex('id');
  const nameIdx = getColumnIndex('name');
  const descriptionIdx = getColumnIndex('description');
  const priceIdx = getColumnIndex('price');
  const quantityIdx = getColumnIndex('quantity');
  const activeIdx = getColumnIndex('active');
  const categoryIdx = getColumnIndex('category');
  const availableOnCustomersIdx = getColumnIndex('available on customers');
  const availableOnCashierIdx = getColumnIndex('available on cashier');
  const availableOnDeliveryIdx = getColumnIndex('available on delivery');
  const imageUrlIdx = getColumnIndex('image url');

  if (nameIdx === -1 || priceIdx === -1 || quantityIdx === -1) {
    throw new Error(
      'CSV must contain at least "Name", "Price", and "Quantity" columns',
    );
  }

  // Process data rows (skip header row and any rows before it)
  for (let i = headerRowIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    const cells = parseCSVLine(line).map((cell) =>
      cell.replace(/^"|"$/g, '').replace(/""/g, '"'),
    );

    const name = cells[nameIdx]?.trim();
    if (!name) continue; // Skip empty rows

    try {
      const productId = idIdx !== -1 ? cells[idIdx]?.trim() : undefined;

      const priceStr = cells[priceIdx]?.trim() || '0';
      const price = Number(priceStr);
      if (Number.isNaN(price) || price < 0) {
        throw new Error(`Invalid price: ${priceStr}`);
      }

      const quantityStr = cells[quantityIdx]?.trim() || '0';
      const quantity = Number(quantityStr);
      if (
        Number.isNaN(quantity) ||
        quantity < 0 ||
        !Number.isInteger(quantity)
      ) {
        throw new Error(`Invalid quantity: ${quantityStr}`);
      }

      const activeStr = cells[activeIdx]?.trim().toLowerCase() || 'yes';
      const active =
        activeStr === 'yes' || activeStr === 'true' || activeStr === '1';

      const availableOnCustomersStr =
        cells[availableOnCustomersIdx]?.trim().toLowerCase() || 'yes';
      const availableOnCustomers =
        availableOnCustomersStr === 'yes' ||
        availableOnCustomersStr === 'true' ||
        availableOnCustomersStr === '1';

      const availableOnCashierStr =
        cells[availableOnCashierIdx]?.trim().toLowerCase() || 'yes';
      const availableOnCashier =
        availableOnCashierStr === 'yes' ||
        availableOnCashierStr === 'true' ||
        availableOnCashierStr === '1';

      const availableOnDeliveryStr =
        cells[availableOnDeliveryIdx]?.trim().toLowerCase() || 'yes';
      const availableOnDelivery =
        availableOnDeliveryStr === 'yes' ||
        availableOnDeliveryStr === 'true' ||
        availableOnDeliveryStr === '1';

      products.push({
        id: productId,
        name,
        description: cells[descriptionIdx]?.trim() || '',
        price,
        quantity,
        active,
        category: cells[categoryIdx]?.trim() || '',
        availableOnCustomers,
        availableOnCashier,
        availableOnDelivery,
        image: cells[imageUrlIdx]?.trim() || undefined,
      });
    } catch (err) {
      errors.push(
        `Row ${i + 1} (${name}): ${
          err instanceof Error ? err.message : 'Unknown error'
        }`,
      );
    }
  }

  if (products.length === 0 && errors.length === 0) {
    throw new Error('No valid products found in CSV file');
  }

  return { products, errors };
};

// Export products to CSV format
export const exportProductsToCSV = (
  products: Array<{
    id: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    active: boolean;
    category?: string;
    availableOnCustomers: boolean;
    availableOnCashier: boolean;
    availableOnDelivery: boolean;
    image?: string;
  }>,
  filename?: string,
): void => {
  const headers = [
    'ID',
    'Name',
    'Description',
    'Price',
    'Quantity',
    'Active',
    'Category',
    'Available on Customers',
    'Available on Cashier',
    'Available on Delivery',
    'Image URL',
  ];

  const data = products.map((product) => [
    product.id,
    product.name,
    product.description || '',
    product.price.toString(),
    product.quantity.toString(),
    product.active ? 'Yes' : 'No',
    product.category || '',
    product.availableOnCustomers ? 'Yes' : 'No',
    product.availableOnCashier ? 'Yes' : 'No',
    product.availableOnDelivery ? 'Yes' : 'No',
    product.image || '',
  ]);

  const defaultFilename = `products-export-${new Date().toISOString().split('T')[0]}.csv`;
  exportToCSV(headers, data, filename || defaultFilename);
};
