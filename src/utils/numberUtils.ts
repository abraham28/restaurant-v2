/**
 * Sanitize number input and limit to 2 decimal places
 * Removes invalid characters, handles multiple decimal points, and prevents negative numbers
 */
export const sanitizeNumberInput = (value: string): string => {
  // Allow empty string
  if (value === '') {
    return '';
  }

  // Remove any non-numeric characters except decimal point and minus sign
  let sanitized = value.replace(/[^\d.-]/g, '');

  // Handle multiple decimal points - keep only the first one
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }

  // Limit to 2 decimal places
  if (parts.length === 2) {
    sanitized = parts[0] + '.' + parts[1].slice(0, 2);
  }

  // Don't allow negative numbers (sales are always positive)
  if (sanitized.startsWith('-')) {
    sanitized = sanitized.replace('-', '');
  }

  return sanitized;
};

/**
 * Validate if a string is a valid positive number
 * Returns false for empty strings, null, undefined, NaN, or non-positive numbers
 */
export const isValidPositiveNumber = (value: string): boolean => {
  if (value === '' || value === null || value === undefined) {
    return false;
  }
  const num = parseFloat(value);
  return !Number.isNaN(num) && isFinite(num) && num > 0;
};
