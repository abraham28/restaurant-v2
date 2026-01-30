import { useEffect, useState } from 'react';
import localDB from 'localDB';

interface UseJsonToObjOptions<T> {
  /**
   * Optional mapper to transform each item before returning.
   * Return undefined to exclude the item from the result.
   */
  mapData?: (item: Record<string, unknown>) => T | undefined;
}

interface UseJsonToObjResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Reusable hook to load a JSON file (from import or fetch), cache in IndexedDB,
 * and return parsed data with loading/error state. Designed for offline-first usage.
 *
 * @param jsonData - Either a JSON array/object imported directly, or a path to fetch JSON from
 * @param cacheKey - Key for IndexedDB caching
 * @param options - Optional configuration including mapData transformer
 */
export function useJsonToObj<T = Record<string, unknown>>(
  jsonData: unknown[] | string,
  cacheKey: string,
  options?: UseJsonToObjOptions<T>,
): UseJsonToObjResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      // 1) Try cached data first (for quick render/offline)
      try {
        const cached =
          await localDB.getCache<Record<string, unknown>[]>(cacheKey);
        if (cached && cached.length > 0 && isMounted) {
          const mapped = options?.mapData
            ? (cached
                .map((item) => options.mapData?.(item))
                .filter((item) => item !== undefined) as T[])
            : (cached as unknown as T[]);
          setData(mapped);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load cached JSON data.',
          );
        }
      }

      // 2) Load JSON data (from import or fetch)
      try {
        let parsed: Record<string, unknown>[];

        if (typeof jsonData === 'string') {
          // Fetch JSON from path
          const response = await fetch(jsonData);
          if (!response.ok) {
            throw new Error('Failed to fetch JSON file.');
          }
          const json = (await response.json()) as
            | Record<string, unknown>
            | Record<string, unknown>[];
          parsed = Array.isArray(json) ? json : [json];
        } else {
          // Use imported JSON data directly
          parsed = Array.isArray(jsonData)
            ? (jsonData as Record<string, unknown>[])
            : [jsonData as Record<string, unknown>];
        }

        const mapped = options?.mapData
          ? (parsed
              .map((item) => options.mapData?.(item))
              .filter((item) => item !== undefined) as T[])
          : (parsed as unknown as T[]);

        // Cache parsed data
        await localDB.storeCache(cacheKey, parsed);

        if (isMounted) {
          setData(mapped);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          // If load fails and no cached data was set, keep whatever cached we had
          if (data.length === 0) {
            setData([]);
          }
          setError(
            err instanceof Error ? err.message : 'Failed to load JSON file.',
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, jsonData]);

  return { data, loading, error };
}
