/**
 * Utility functions for cache key management
 */

/**
 * Gets the last 6 digits of a company ID for use in cache keys
 * @param companyId - The company ID (UUID format)
 * @returns The last 6 characters of the company ID, or empty string if invalid
 */
export function getCompanyIdSuffix(
  companyId: string | null | undefined,
): string {
  if (!companyId || companyId.length < 6) {
    return '';
  }
  return companyId.slice(-6);
}

/**
 * Creates a cache key with company ID suffix prepended
 * @param baseKey - The base cache key
 * @param companyId - The company ID (optional)
 * @returns The cache key with company ID suffix prepended
 */
export function getCacheKeyWithCompany(
  baseKey: string,
  companyId: string | null | undefined,
): string {
  const suffix = getCompanyIdSuffix(companyId);
  if (!suffix) {
    return baseKey;
  }
  return `${suffix}_${baseKey}`;
}
