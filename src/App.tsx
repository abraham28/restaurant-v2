import React from 'react';
import ErrorBoundary from 'atomic-components/ErrorBoundary/ErrorBoundary';
import PageTitle from 'atomic-components/PageTitle/PageTitle';
import ServiceWorkerUpdatePrompt from 'atomic-components/ServiceWorkerUpdatePrompt/ServiceWorkerUpdatePrompt';
import AppHeader from 'components/AppHeader';
import AppSidebar from 'components/AppSidebar';
import { useServiceWorker } from 'hooks/useServiceWorker';
import Home from 'pages/home';
import Products from 'pages/Products';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

function AppContent() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PRODUCTS.ROOT} element={<Products />} />
    </Routes>
  );
}

function App() {
  const { registration, isUpdateAvailable } = useServiceWorker();

  return (
    <ErrorBoundary>
      <PageTitle />
      <AppHeader />
      <AppSidebar />
      {registration && isUpdateAvailable && (
        <ServiceWorkerUpdatePrompt registration={registration} />
      )}
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
