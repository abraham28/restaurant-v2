import React, { useEffect, useState } from 'react';
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
import CustomerDetailsModal from './CIS/CustomerDetails';
import UserProfile from './UserProfile';
import UserActions from './UserActions';
import AccountsModal from './CIS/Accounts';
import SettingsModal from './CIS/Settings';
import AuditLogModal from './CIS/AuditLog';
import AssessmentModal from './CIS/Assessment';
import UserSettingsModal from './UserSettings';
import LogoutModal from './UserLogOut';

function AppSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const [activeNavId, setActiveNavId] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname.startsWith(ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT)) {
      setActiveNavId('core-modules-cis');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- set active nav only on mount so user's clicked item stays active
  }, []);
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
        <NavListGroup label="Core Modules" collapsible defaultExpanded={false}>
          <NavListItem
            label="CIS"
            icon={Database}
            to={ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT}
            active={activeNavId === 'core-modules-cis'}
            onClick={() => setActiveNavId('core-modules-cis')}
          />
          <NavListItem
            label="Deposits"
            icon={PiggyBank}
            active={activeNavId === 'core-modules-deposits'}
            onClick={() => {
              setActiveNavId('core-modules-deposits');
              // TODO: Navigate to Deposits page
            }}
          />
          <NavListItem
            label="Loans"
            icon={Building2}
            active={activeNavId === 'core-modules-loans'}
            onClick={() => {
              setActiveNavId('core-modules-loans');
              // TODO: Navigate to Loans page
            }}
          />
          <NavListItem
            label="GL"
            icon={FileText}
            active={activeNavId === 'core-modules-gl'}
            onClick={() => {
              setActiveNavId('core-modules-gl');
              // TODO: Navigate to GL page
            }}
          />
        </NavListGroup>

        <NavListGroup
          label="Report Modules"
          collapsible
          defaultExpanded={false}
        >
          <NavListItem
            label="CIS"
            icon={Database}
            active={activeNavId === 'report-cis'}
            onClick={() => {
              setActiveNavId('report-cis');
              // TODO: Navigate to CIS Reports page
            }}
          />
          <NavListItem
            label="Deposits"
            icon={PiggyBank}
            active={activeNavId === 'report-deposits'}
            onClick={() => {
              setActiveNavId('report-deposits');
              // TODO: Navigate to Deposits Reports page
            }}
          />
          <NavListItem
            label="Loans"
            icon={Building2}
            active={activeNavId === 'report-loans'}
            onClick={() => {
              setActiveNavId('report-loans');
              // TODO: Navigate to Loans Reports page
            }}
          />
          <NavListItem
            label="GL"
            icon={FileText}
            active={activeNavId === 'report-gl'}
            onClick={() => {
              setActiveNavId('report-gl');
              // TODO: Navigate to GL Reports page
            }}
          />
          <NavListItem
            label="Dynamic Query Builder"
            icon={BarChart3}
            active={activeNavId === 'report-dynamic-query'}
            onClick={() => {
              setActiveNavId('report-dynamic-query');
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
            active={activeNavId === 'regulatory-bsp'}
            onClick={() => {
              setActiveNavId('regulatory-bsp');
              // TODO: Navigate to BSP page
            }}
          />
          <NavListItem
            label="AMLC"
            icon={ShieldCheck}
            active={activeNavId === 'regulatory-amlc'}
            onClick={() => {
              setActiveNavId('regulatory-amlc');
              // TODO: Navigate to AMLC page
            }}
          />
          <NavListItem
            label="PDIC"
            icon={FileText}
            active={activeNavId === 'regulatory-pdic'}
            onClick={() => {
              setActiveNavId('regulatory-pdic');
              // TODO: Navigate to PDIC page
            }}
          />
          <NavListItem
            label="CIC"
            icon={Database}
            active={activeNavId === 'regulatory-cic'}
            onClick={() => {
              setActiveNavId('regulatory-cic');
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
