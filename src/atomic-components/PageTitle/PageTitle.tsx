import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const APP_NAME = 'restaurant';

// Map routes to translation keys for page titles
const routeTitleKeys: Record<string, string> = {
  '/': 'menu',
  '/sample': 'sample',
  '/sample/create': 'sampleCreate',
  '/sample/edit': 'sampleEdit',
};

// Function to get title from path
function getTitleFromPath(
  pathname: string,
  t: (key: string) => string,
): string {
  // Check exact match first
  if (routeTitleKeys[pathname]) {
    return t(routeTitleKeys[pathname]);
  }

  // Default: use the last segment of the path
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1];
    // Capitalize first letter
    return (
      lastSegment.charAt(0).toUpperCase() +
      lastSegment.slice(1).replace(/-/g, ' ')
    );
  }

  return t('pageNotFound');
}

function PageTitle() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const title = getTitleFromPath(location.pathname, t);
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [location.pathname, t]);

  return null; // This component doesn't render anything
}

export default PageTitle;
