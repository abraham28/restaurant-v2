import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'utils/constants';
import type { BreadcrumbItem } from 'atomic-components/Breadcrumbs/types';

// Map route segments to translation keys
const routeSegmentKeys: Record<string, string> = {
  'client-information-system': 'clientInformationSystem',
  new: 'add',
  review: 'clientInformationSystemReview',
  csvutils: 'csvToJson',
  csvtojson: 'csvToJson',
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();
  const { t } = useTranslation();

  return useMemo<BreadcrumbItem[]>(() => {
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);

    // If we're on the home page, return app name
    if (pathname === ROUTES.HOME || segments.length === 0) {
      return [
        {
          title: t('appName'),
          href: ROUTES.HOME,
        },
      ];
    }

    const items: BreadcrumbItem[] = [];
    let currentPath = '';

    segments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Get translation key for this segment
      const translationKey = routeSegmentKeys[segment.toLowerCase()];
      let title: string;

      if (translationKey) {
        title = t(translationKey);
      } else {
        // Fallback: capitalize and replace hyphens with spaces
        title =
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      }

      items.push({
        title,
        href: currentPath,
      });
    });

    return items;
  }, [location.pathname, t]);
};
