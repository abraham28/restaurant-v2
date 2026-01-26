import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const APP_NAME = 'core-banking';

// Map routes to page titles
const routeTitles: Record<string, string> = {
  '/': 'Menu',
  '/client-information-system': 'Client Information System',
  '/client-information-system/insert': 'Client Information System - Insert',
};

// Function to get title from path
function getTitleFromPath(pathname: string): string {
  // Check exact match first
  if (routeTitles[pathname]) {
    return routeTitles[pathname];
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

  return 'Page Not Found';
}

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const title = getTitleFromPath(location.pathname);
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [location.pathname]);

  return null; // This component doesn't render anything
}

export default PageTitle;
