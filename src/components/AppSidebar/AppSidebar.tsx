import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import Sidebar from 'atomic-components/Sidebar';
import NavListItem from 'atomic-components/NavListItem';
import NavListGroup from 'atomic-components/NavListGroup';
import {
  useI18nStore,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from 'stores/i18nStore';
import { ROUTES } from 'utils/constants';

function AppSidebar() {
  const location = useLocation();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useI18nStore();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = async (
    lang: keyof typeof SUPPORTED_LANGUAGES,
  ) => {
    await setLanguage(lang);
    handleClose();
  };

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={handleClose}
      onToggle={handleToggle}
      logo="/android-chrome-192x192.png"
      logoAlt={t('appNameLogo')}
      title={t('appName')}
    >
      <NavListGroup label={t('clientInformation')}>
        <NavListItem
          label={t('clientInformationSystem')}
          icon={FileText}
          to={ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT}
          active={location.pathname.startsWith(
            ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT,
          )}
          onClick={handleClose}
        />
      </NavListGroup>

      <NavListGroup label={t('language')}>
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <NavListItem
            key={code}
            label={name}
            active={language === code}
            onClick={() => void handleLanguageChange(code as SupportedLanguage)}
          />
        ))}
      </NavListGroup>
    </Sidebar>
  );
}

export default AppSidebar;
