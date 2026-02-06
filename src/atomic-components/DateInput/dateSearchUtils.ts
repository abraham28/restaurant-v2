export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_ABBREVS = MONTH_NAMES.map((m) => m.slice(0, 3).toLowerCase());

export interface ParsedDate {
  year?: number;
  month?: number;
  day?: number;
}

export interface DateSuggestion {
  display: string;
  iso: string;
}

// Format a Date object to "Month DD, YYYY"
export const formatDisplayDate = (date: Date): string => {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

// Format a Date object to "YYYY-MM-DD"
export const formatISODate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Parse flexible date input into { year?, month?, day? }
export const parseDateInput = (raw: string): ParsedDate => {
  const trimmed = raw.trim();
  if (!trimmed) return {};

  // Check for month name at the start (e.g. "Jul", "July", "July 28", "July 28, 1996")
  const monthNameMatch = trimmed.match(
    /^([a-zA-Z]+)\s*(\d{1,2})?[,\s]*(\d{4})?$/,
  );
  if (monthNameMatch) {
    const mName = monthNameMatch[1].toLowerCase();
    const mIdx = MONTH_ABBREVS.findIndex(
      (abbr, i) =>
        abbr === mName.slice(0, 3) || MONTH_NAMES[i].toLowerCase() === mName,
    );
    if (mIdx !== -1) {
      return {
        month: mIdx + 1,
        day: monthNameMatch[2] ? parseInt(monthNameMatch[2], 10) : undefined,
        year: monthNameMatch[3] ? parseInt(monthNameMatch[3], 10) : undefined,
      };
    }
  }

  // Pure digits: could be YYYY, MMDDYYYY, or YYYYMMDD
  const digits = trimmed.replace(/\D/g, '');
  if (digits === trimmed) {
    if (digits.length <= 4) {
      // Treat as year prefix
      return { year: undefined }; // handled by yearPrefix logic
    }
    if (digits.length === 8) {
      // Could be MMDDYYYY or YYYYMMDD
      const asMMDD = {
        month: parseInt(digits.slice(0, 2), 10),
        day: parseInt(digits.slice(2, 4), 10),
        year: parseInt(digits.slice(4, 8), 10),
      };
      const asYYYY = {
        year: parseInt(digits.slice(0, 4), 10),
        month: parseInt(digits.slice(4, 6), 10),
        day: parseInt(digits.slice(6, 8), 10),
      };
      // Prefer MMDDYYYY if month <= 12
      if (asMMDD.month >= 1 && asMMDD.month <= 12) return asMMDD;
      return asYYYY;
    }
  }

  // Delimited formats: MM-DD-YYYY, MM/DD/YYYY, YYYY-MM-DD, YYYY/MM/DD
  const parts = trimmed.split(/[-/]/);
  if (parts.length >= 2) {
    const nums = parts.map((p) => parseInt(p, 10));
    if (parts.length === 3 && !isNaN(nums[0]) && !isNaN(nums[1])) {
      // If first part is 4 digits, treat as YYYY-MM-DD
      if (parts[0].length === 4) {
        return {
          year: nums[0],
          month: nums[1],
          day: !isNaN(nums[2]) ? nums[2] : undefined,
        };
      }
      // Otherwise MM-DD-YYYY or MM-D-YYYY
      return {
        month: nums[0],
        day: nums[1],
        year: !isNaN(nums[2]) ? nums[2] : undefined,
      };
    }
    if (parts.length === 2 && !isNaN(nums[0]) && !isNaN(nums[1])) {
      // MM-DD or YYYY-MM
      if (parts[0].length === 4) {
        return { year: nums[0], month: nums[1] };
      }
      return { month: nums[0], day: nums[1] };
    }
  }

  return {};
};

// Helper to add a valid date to results if not duplicate
const addResult = (
  results: DateSuggestion[],
  date: Date,
  max: number,
  minDate: Date,
  maxDate: Date,
): boolean => {
  if (results.length >= max) return false;
  date.setHours(0, 0, 0, 0);
  if (
    isNaN(date.getTime()) ||
    date < minDate ||
    date > maxDate ||
    date.getFullYear() < minDate.getFullYear()
  )
    return true;
  const iso = formatISODate(date);
  if (results.some((r) => r.iso === iso)) return true;
  results.push({ display: formatDisplayDate(date), iso });
  return true;
};

// Generate date suggestions based on flexible input
export const generateDateSuggestions = (
  inputValue: string,
  minDate: Date,
  maxDate: Date,
  maxResults: number = 8,
): DateSuggestion[] => {
  const trimmed = inputValue.trim();
  if (!trimmed) return [];

  const results: DateSuggestion[] = [];
  const digits = trimmed.replace(/\D/g, '');

  // Try structured parse first
  const parsed = parseDateInput(trimmed);

  // Case: full date (year + month + day)
  if (parsed.year && parsed.month && parsed.day) {
    addResult(
      results,
      new Date(parsed.year, parsed.month - 1, parsed.day),
      maxResults,
      minDate,
      maxDate,
    );
    return results;
  }

  // Case: month + day, no year — suggest across recent years
  if (parsed.month && parsed.day && !parsed.year) {
    for (let y = maxDate.getFullYear(); y >= minDate.getFullYear(); y--) {
      if (results.length >= maxResults) break;
      addResult(
        results,
        new Date(y, parsed.month - 1, parsed.day),
        maxResults,
        minDate,
        maxDate,
      );
    }
    return results;
  }

  // Case: month only (e.g. "Jul", "July") — suggest 1st of that month across years
  if (parsed.month && !parsed.day && !parsed.year) {
    for (let y = maxDate.getFullYear(); y >= minDate.getFullYear(); y--) {
      if (results.length >= maxResults) break;
      addResult(
        results,
        new Date(y, parsed.month - 1, 1),
        maxResults,
        minDate,
        maxDate,
      );
    }
    return results;
  }

  // Case: year + month, no day — suggest 1st, 15th, last
  if (parsed.year && parsed.month && !parsed.day) {
    const y = parsed.year;
    const m = parsed.month;
    const dim = new Date(y, m, 0).getDate();
    addResult(results, new Date(y, m - 1, 1), maxResults, minDate, maxDate);
    addResult(results, new Date(y, m - 1, 15), maxResults, minDate, maxDate);
    addResult(results, new Date(y, m - 1, dim), maxResults, minDate, maxDate);
    return results;
  }

  // Case: pure digits, 4 or fewer — year prefix
  if (digits === trimmed && digits.length <= 4) {
    const yearPrefix = digits;
    for (let y = maxDate.getFullYear(); y >= minDate.getFullYear(); y--) {
      if (results.length >= maxResults) break;
      if (String(y).startsWith(yearPrefix)) {
        addResult(results, new Date(y, 0, 1), maxResults, minDate, maxDate);
      }
    }
    return results;
  }

  // Case: pure digits 5-7 — YYYYMM or YYYYMMD partial
  if (digits === trimmed && digits.length >= 5 && digits.length <= 7) {
    const year = parseInt(digits.slice(0, 4), 10);
    const monthStr = digits.slice(4, 6);
    const dayStr = digits.slice(6);

    for (let m = 1; m <= 12; m++) {
      if (results.length >= maxResults) break;
      const mStr = String(m).padStart(2, '0');
      if (!mStr.startsWith(monthStr)) continue;
      const dim = new Date(year, m, 0).getDate();

      if (dayStr) {
        for (let d = 1; d <= dim; d++) {
          if (results.length >= maxResults) break;
          if (String(d).padStart(2, '0').startsWith(dayStr)) {
            addResult(
              results,
              new Date(year, m - 1, d),
              maxResults,
              minDate,
              maxDate,
            );
          }
        }
      } else {
        addResult(
          results,
          new Date(year, m - 1, 1),
          maxResults,
          minDate,
          maxDate,
        );
        addResult(
          results,
          new Date(year, m - 1, dim),
          maxResults,
          minDate,
          maxDate,
        );
      }
    }
    return results;
  }

  return results;
};
