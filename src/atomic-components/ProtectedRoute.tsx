import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { ROUTES } from 'utils/constants';
import { Loader2 } from 'lucide-react';
import styles from './ProtectedRoute.module.scss';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (
      !isLoading &&
      !isAuth &&
      location.pathname !== ROUTES.LOGIN &&
      location.pathname !== ROUTES.HOME &&
      location.pathname !== ROUTES.AUTH_CALLBACK
    ) {
      navigate(ROUTES.LOGIN, {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [isAuth, isLoading, location.pathname, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.loadingIcon} size={48} />
        <p className={styles.loadingText}>Loading Authentication...</p>
      </div>
    );
  }

  // If not authenticated, don't render (will redirect)
  if (!isAuth) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}

export default ProtectedRoute;
