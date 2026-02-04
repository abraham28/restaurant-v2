import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Database,
  PiggyBank,
  Building2,
  FileText,
  BarChart3,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import Sidebar from 'atomic-components/Sidebar';
import NavListItem from 'atomic-components/NavListItem';
import NavListGroup from 'atomic-components/NavListGroup';
import { ROUTES } from 'utils/constants';
import CustomerDetailsModal from './CustomerDetailsModal';
import UserProfile from './UserProfile';
import UserActions from './UserActions';
import AccountsModal from './AccountsModal';
import SettingsModal from './SettingsModal';
import AuditLogModal from './AuditLogModal';
import AssessmentModal from './AssessmentModal';
import UserSettingsModal from './UserSettingsModal';
import LogoutModal from './LogoutModal';

function AppSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const [showCustomerDetailsModal, setShowCustomerDetailsModal] =
    useState(false);
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAuditLogModal, setShowAuditLogModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <Sidebar
        logo="/android-chrome-192x192.png"
        logoAlt={t('appNameLogo')}
        title={t('appName')}
        userProfile={<UserProfile userName="John Doer" userPhotoUrl={null} />}
        userActions={
          <UserActions
            onSettingsClick={() => setShowUserSettingsModal(true)}
            onLogoutClick={() => setShowLogoutModal(true)}
          />
        }
      >
        <NavListGroup label={t('clientInformation')}>
          <NavListItem
            label={t('navCIS')}
            icon={FileText}
            to={ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT}
            active={location.pathname.startsWith(
              ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT,
            )}
          />
        </NavListGroup>

        <NavListGroup label="Core Modules" collapsible defaultExpanded={false}>
          <NavListItem
            label="CIS"
            icon={Database}
            to={ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT}
            active={false}
          />
          <NavListItem
            label="Deposits"
            icon={PiggyBank}
            onClick={() => {
              // TODO: Navigate to Deposits page
            }}
          />
          <NavListItem
            label="Loans"
            icon={Building2}
            onClick={() => {
              // TODO: Navigate to Loans page
            }}
          />
          <NavListItem
            label="GL"
            icon={FileText}
            onClick={() => {
              // TODO: Navigate to GL page
            }}
          />
        </NavListGroup>

        <NavListGroup label="Report Modules" collapsible defaultExpanded={false}>
          <NavListItem
            label="CIS"
            icon={Database}
            onClick={() => {
              // TODO: Navigate to CIS Reports page
            }}
          />
          <NavListItem
            label="Deposits"
            icon={PiggyBank}
            onClick={() => {
              // TODO: Navigate to Deposits Reports page
            }}
          />
          <NavListItem
            label="Loans"
            icon={Building2}
            onClick={() => {
              // TODO: Navigate to Loans Reports page
            }}
          />
          <NavListItem
            label="GL"
            icon={FileText}
            onClick={() => {
              // TODO: Navigate to GL Reports page
            }}
          />
          <NavListItem
            label="Dynamic Query Builder"
            icon={BarChart3}
            onClick={() => {
              // TODO: Navigate to Dynamic Query Builder page
            }}
          />
        </NavListGroup>

        <NavListGroup
          label="Regulatory Compliance"
          collapsible
          defaultExpanded={false}
        >
          <NavListItem
            label="BSP"
            icon={Scale}
            onClick={() => {
              // TODO: Navigate to BSP page
            }}
          />
          <NavListItem
            label="AMLC"
            icon={ShieldCheck}
            onClick={() => {
              // TODO: Navigate to AMLC page
            }}
          />
          <NavListItem
            label="PDIC"
            icon={FileText}
            onClick={() => {
              // TODO: Navigate to PDIC page
            }}
          />
          <NavListItem
            label="CIC"
            icon={Database}
            onClick={() => {
              // TODO: Navigate to CIC page
            }}
          />
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
      <AssessmentModal
        show={showAssessmentModal}
        onHide={() => setShowAssessmentModal(false)}
      />
      <UserSettingsModal
        show={showUserSettingsModal}
        onHide={() => setShowUserSettingsModal(false)}
      />
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
      />
    </>
  );
}

export default AppSidebar;
