import React from 'react';
import { useTranslation } from 'react-i18next';
import { useI18nStore, SUPPORTED_LANGUAGES } from 'stores/i18nStore';
import styles from './LanguageSwitcher.module.scss';

function LanguageSwitcher() {
  const { t } = useTranslation();
  const { language, setLanguage } = useI18nStore();

  const handleLanguageChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newLang = event.target.value as keyof typeof SUPPORTED_LANGUAGES;
    await setLanguage(newLang);
  };

  return (
    <div className={styles.languageSwitcher}>
      <label htmlFor="language-select" className={styles.label}>
        {t('language') || 'Language'}:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(event) => void handleLanguageChange(event)}
        className={styles.select}
        aria-label="Select language"
      >
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
