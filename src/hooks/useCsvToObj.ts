import { useEffect, useState } from 'react';
import { csvToObjects } from 'utils/csvUtils';
import { getData, storeData } from 'utils/indexedDBUtils';

interface UseCsvToObjOptions<T> {
  /**
   * Custom search columns to help auto-detect the header row.
   * Defaults to ['id', 'name'].
   */
  searchColumns?: string[];
  /**
   * Whether to skip completely empty rows.
   * Defaults to true.
   */
  skipEmptyRows?: boolean;
  /**
   * Optional mapper to transform each parsed row before returning.
   * Return undefined to exclude the row from the result.
   */
  mapData?: (row: Record<string, string>) => T | undefined;
}

interface UseCsvToObjResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Reusable hook to load a CSV file, convert to objects, cache in IndexedDB,
 * and return parsed data with loading/error state. Designed for offline-first usage.
 */
export function useCsvToObj<T = Record<string, string>>(
  csvPath: string,
  cacheKey: string,
  options?: UseCsvToObjOptions<T>,
): UseCsvToObjResult<T> {
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
        const cached = await getData<Record<string, string>[]>(cacheKey);
        if (cached && cached.length > 0 && isMounted) {
          const mapped = options?.mapData
            ? (cached
                .map((row) => options.mapData?.(row))
                .filter((item) => item !== undefined) as T[])
            : (cached as unknown as T[]);
          setData(mapped);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load cached CSV data.',
          );
        }
      }

      // 2) Fetch latest CSV
      try {
        const response = await fetch(csvPath);
        if (!response.ok) {
          throw new Error('Failed to fetch CSV file.');
        }
        const csvText = await response.text();

        const { data: parsed, errors } = csvToObjects(csvText, {
          searchColumns: options?.searchColumns || ['id', 'name'],
          skipEmptyRows: options?.skipEmptyRows ?? true,
        });

        if (errors.length > 0) {
          console.warn('CSV parsing errors:', errors);
        }

        const mapped = options?.mapData
          ? (parsed
              .map((row) => options.mapData?.(row))
              .filter((item) => item !== undefined) as T[])
          : (parsed as unknown as T[]);

        // Cache parsed data
        await storeData(cacheKey, parsed);

        if (isMounted) {
          setData(mapped);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          // If fetch fails and no cached data was set, keep whatever cached we had
          if (data.length === 0) {
            setData([]);
          }
          setError(
            err instanceof Error ? err.message : 'Failed to load CSV file.',
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
  }, [csvPath, cacheKey]);

  return { data, loading, error };
}
