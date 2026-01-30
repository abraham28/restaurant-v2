import { create } from 'zustand';
import i18n, { SupportedLanguage, SUPPORTED_LANGUAGES } from 'i18n/config';
import { loadUserTranslations } from 'i18n/config';

interface I18nState {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
  loadUserPreferences: (userId: string) => Promise<void>;
}

const STORAGE_KEY = 'i18n-language-preference';

// Load initial language from localStorage
const getStoredLanguage = (): SupportedLanguage => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'en' || stored === 'tl')) {
      return stored;
    }
  } catch {
    console.warn('Failed to read stored language preference');
  }
  return 'en';
};

/**
 * Zustand store for managing i18n language preferences
 * Persists language preference to localStorage
 */
export const useI18nStore = create<I18nState>((set, get) => ({
  language: getStoredLanguage(),
  setLanguage: async (lang: SupportedLanguage) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    set({ language: lang });
  },
  loadUserPreferences: async (userId: string) => {
    const currentLang = get().language;
    await loadUserTranslations(userId, currentLang);
  },
}));

// Initialize i18n language from store on load
const initialLanguage = getStoredLanguage();
void i18n.changeLanguage(initialLanguage);

export { SUPPORTED_LANGUAGES };
export type { SupportedLanguage };
