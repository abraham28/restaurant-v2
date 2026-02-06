/**
 * Computes the Levenshtein distance between two strings.
 * Used for fuzzy matching to tolerate typos.
 */
export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array<number>(n + 1).fill(0),
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

/**
 * Returns the minimum Levenshtein distance between the query and any
 * substring of the target with the same length as the query.
 * This allows fuzzy substring matching (e.g. "Gurrero" matches "Guerrero").
 */
export function minSubstringDistance(query: string, target: string): number {
  if (query.length > target.length) return levenshtein(query, target);
  let min = Infinity;
  const windowSize = query.length;
  for (let i = 0; i <= target.length - windowSize; i++) {
    const sub = target.substring(i, i + windowSize);
    const dist = levenshtein(query, sub);
    if (dist < min) min = dist;
    if (min === 0) return 0;
  }
  return min;
}
