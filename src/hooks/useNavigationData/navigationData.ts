import { useEffect, useState, useMemo } from 'react';
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
  User,
  Wallet,
  Settings,
  FileSearch,
  ClipboardCheck,
} from 'lucide-react';
import { ROUTES } from 'utils/constants';
import type { NavGroup } from './types';
import { getActiveNavIdFromPath } from './navigationUtils';

/**
 * Hook that returns navigation data with translated labels and active nav ID
 */
export function useNavigationData(): {
  navigationGroups: NavGroup[];
  activeNavId: string | null;
  setActiveNavId: (id: string | null) => void;
} {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeNavId, setActiveNavId] = useState<string | null>(null);

  const navigationGroups: NavGroup[] = useMemo(
    () => [
      {
        id: 'core-modules',
        label: t('navCoreModules'),
        items: [
          {
            id: 'core-modules-cis',
            label: t('navCIS'),
            icon: Database,
            to: ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT,
            items: [
              {
                id: 'core-modules-cis-customer-details',
                label: t('navCustomerDetails'),
                icon: User,
                to: ROUTES.CLIENT_INFORMATION_SYSTEM.CUSTOMER_DETAILS,
              },
              {
                id: 'core-modules-cis-accounts',
                label: t('navAccounts'),
                icon: Wallet,
                to: ROUTES.CLIENT_INFORMATION_SYSTEM.ACCOUNTS,
              },
              {
                id: 'core-modules-cis-settings',
                label: t('navSettings'),
                icon: Settings,
                to: ROUTES.CLIENT_INFORMATION_SYSTEM.SETTINGS,
              },
              {
                id: 'core-modules-cis-audit-log',
                label: t('navAuditLog'),
                icon: FileSearch,
                to: ROUTES.CLIENT_INFORMATION_SYSTEM.AUDIT_LOG,
              },
              {
                id: 'core-modules-cis-assessment',
                label: t('navAssessment'),
                icon: ClipboardCheck,
                to: ROUTES.CLIENT_INFORMATION_SYSTEM.ASSESSMENT,
              },
            ],
          },
          {
            id: 'core-modules-deposits',
            label: t('navDeposits'),
            icon: PiggyBank,
            to: ROUTES.DEPOSITS,
          },
          {
            id: 'core-modules-loans',
            label: t('navLoans'),
            icon: Building2,
            to: ROUTES.LOANS,
          },
          {
            id: 'core-modules-gl',
            label: t('navGL'),
            icon: FileText,
            to: ROUTES.GL,
          },
        ],
      },
      {
        id: 'report-modules',
        label: t('navReportModules'),
        items: [
          {
            id: 'report-cis',
            label: t('navCIS'),
            icon: Database,
            to: ROUTES.REPORTS.CIS,
          },
          {
            id: 'report-deposits',
            label: t('navDeposits'),
            icon: PiggyBank,
            to: ROUTES.REPORTS.DEPOSITS,
          },
          {
            id: 'report-loans',
            label: t('navLoans'),
            icon: Building2,
            to: ROUTES.REPORTS.LOANS,
          },
          {
            id: 'report-gl',
            label: t('navGL'),
            icon: FileText,
            to: ROUTES.REPORTS.GL,
          },
          {
            id: 'report-dynamic-query',
            label: t('navDynamicQueryBuilder'),
            icon: BarChart3,
            to: ROUTES.REPORTS.DYNAMIC_QUERY,
          },
        ],
      },
      {
        id: 'regulatory-compliance',
        label: t('navRegulatoryCompliance'),
        items: [
          {
            id: 'regulatory-bsp',
            label: t('navBSP'),
            icon: Scale,
            to: ROUTES.REGULATORY.BSP,
          },
          {
            id: 'regulatory-amla',
            label: t('navAMLA'),
            icon: ShieldCheck,
            to: ROUTES.REGULATORY.AMLA,
          },
          {
            id: 'regulatory-pdic',
            label: t('navPDIC'),
            icon: FileText,
            to: ROUTES.REGULATORY.PDIC,
          },
          {
            id: 'regulatory-cic',
            label: t('navCIC'),
            icon: Database,
            to: ROUTES.REGULATORY.CIC,
          },
        ],
      },
    ],
    [t],
  );

  // Automatically set active nav ID from current route
  useEffect(() => {
    const navId = getActiveNavIdFromPath(location.pathname, navigationGroups);
    setActiveNavId(navId);
  }, [location.pathname, navigationGroups]);

  return {
    navigationGroups,
    activeNavId,
    setActiveNavId,
  };
}
