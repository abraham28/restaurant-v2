import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import localDB from 'localDB';
import { API_ROUTES } from 'utils/constants';

// Import base translations
import enCommon from './locales/en/common.json';
import tlCommon from './locales/tl/common.json';

// Supported languages
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  tl: 'Tagalog',
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// Initialize i18next
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      tl: {
        common: tlCommon,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator'],
      // Cache user language preference
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

/**
 * Load user-specific translations from API and merge with base translations
 * @param userId - User ID to fetch translations for
 * @param language - Language code (e.g., 'en', 'tl')
 */
export async function loadUserTranslations(
  userId: string,
  language: SupportedLanguage = 'en',
): Promise<void> {
  const cacheKey = `user_translations_${userId}_${language}`;

  try {
    // Try to fetch from API first
    const translationsUrl = API_ROUTES.USERS.TRANSLATIONS(userId, language);
    const response = await fetch(translationsUrl);
    if (response.ok) {
      const userTranslations = (await response.json()) as Record<
        string,
        string
      >;

      // Merge user translations into i18next
      // The 'true' parameter means merge (not replace), and the second 'true' means deep merge
      i18n.addResourceBundle(language, 'common', userTranslations, true, true);

      // Cache in IndexedDB for offline access
      await localDB.storeCache(cacheKey, userTranslations);
    }
  } catch {
    // If offline or API fails, try to load from IndexedDB cache
    console.warn('Failed to fetch user translations from API, trying cache...');
    const cached = await localDB.getCache<Record<string, string>>(cacheKey);
    if (cached) {
      i18n.addResourceBundle(language, 'common', cached, true, true);
    }
  }
}

/**
 * Clear user-specific translations (useful when logging out or switching users)
 */
export function clearUserTranslations(): void {
  // Note: This doesn't remove base translations, only user-specific overrides
  // To fully reset, you'd need to reload the base resources
  // For now, we'll just change the language which will reload base resources
  const currentLang = i18n.language;
  void i18n.changeLanguage(currentLang);
}

export default i18n;
