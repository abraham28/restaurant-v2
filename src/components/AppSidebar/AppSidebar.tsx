import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, User, CreditCard, Settings, History } from 'lucide-react';
import Sidebar from 'atomic-components/Sidebar';
import NavListItem from 'atomic-components/NavListItem';
import NavListGroup from 'atomic-components/NavListGroup';
import {
  useI18nStore,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from 'stores/i18nStore';
import { ROUTES } from 'utils/constants';
import CustomerDetailsModal from './CustomerDetailsModal';
import AccountsModal from './AccountsModal';
import SettingsModal from './SettingsModal';
import AuditLogModal from './AuditLogModal';

function AppSidebar() {
  const location = useLocation();
  const { t } = useTranslation();
  const { language, setLanguage } = useI18nStore();

  const [showCustomerDetailsModal, setShowCustomerDetailsModal] =
    useState(false);
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAuditLogModal, setShowAuditLogModal] = useState(false);

  const handleLanguageChange = async (
    lang: keyof typeof SUPPORTED_LANGUAGES,
  ) => {
    await setLanguage(lang);
  };

  return (
    <>
      <Sidebar
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
          />
        </NavListGroup>

        <NavListGroup label="CIS Sections">
          <NavListItem
            label="Customer Details"
            icon={User}
            onClick={() => {
              setShowCustomerDetailsModal(true);
            }}
          />
          <NavListItem
            label="Accounts"
            icon={CreditCard}
            onClick={() => {
              setShowAccountsModal(true);
            }}
          />
          <NavListItem
            label="Settings"
            icon={Settings}
            onClick={() => {
              setShowSettingsModal(true);
            }}
          />
          <NavListItem
            label="Audit Log"
            icon={History}
            onClick={() => {
              setShowAuditLogModal(true);
            }}
          />
        </NavListGroup>

        <NavListGroup label={t('language')}>
          {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
            <NavListItem
              key={code}
              label={name}
              active={language === code}
              onClick={() =>
                void handleLanguageChange(code as SupportedLanguage)
              }
            />
          ))}
        </NavListGroup>
      </Sidebar>

      <CustomerDetailsModal
        show={showCustomerDetailsModal}
        onHide={() => setShowCustomerDetailsModal(false)}
      />
      <AccountsModal
        show={showAccountsModal}
        onHide={() => setShowAccountsModal(false)}
      />
      <SettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
      />
      <AuditLogModal
        show={showAuditLogModal}
        onHide={() => setShowAuditLogModal(false)}
      />
    </>
  );
}

export default AppSidebar;
