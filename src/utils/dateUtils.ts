/**
 * Get date range for "This Month"
 */
export const getThisMonthRange = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();

  // Create dates in UTC to avoid timezone issues
  const dateFrom = new Date(Date.UTC(year, month, 1));
  const dateTo = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

  return {
    dateFrom: formatDateToUTC(dateFrom),
    dateTo: formatDateToUTC(dateTo),
  };
};

/**
 * Get date range for "Last Month"
 */
export const getLastMonthRange = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();

  // Create dates in UTC to avoid timezone issues
  const dateFrom = new Date(Date.UTC(year, month - 1, 1));
  const dateTo = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  return {
    dateFrom: formatDateToUTC(dateFrom),
    dateTo: formatDateToUTC(dateTo),
  };
};

/**
 * Get date range for "1 Year"
 */
export const getOneYearRange = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  // Create dates in UTC to avoid timezone issues
  const dateTo = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));
  const dateFrom = new Date(Date.UTC(year - 1, month, day));

  return {
    dateFrom: formatDateToUTC(dateFrom),
    dateTo: formatDateToUTC(dateTo),
  };
};

/**
 * Format date to YYYY-MM-DD format in UTC
 */
export const formatDateToUTC = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format date to YYYY-MM-DD format from local date string
 */
export const formatLocalDateToUTC = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDateToUTC(date);
};

/**
 * Get end date for "Last Year" (December 31 of last year)
 */
export const getLastYearEndDate = (): string => {
  const now = new Date();
  const lastYear = now.getUTCFullYear() - 1;
  const dateTo = new Date(Date.UTC(lastYear, 11, 31, 23, 59, 59, 999)); // December 31 of last year

  return formatDateToUTC(dateTo);
};

/**
 * Get date range for "This Year" (January 1 of current year to today)
 */
export const getThisYearRange = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  // Create dates in UTC to avoid timezone issues
  const dateFrom = new Date(Date.UTC(year, 0, 1)); // January 1 of current year
  const dateTo = new Date(Date.UTC(year, month, day, 23, 59, 59, 999)); // Today

  return {
    dateFrom: formatDateToUTC(dateFrom),
    dateTo: formatDateToUTC(dateTo),
  };
};
