import React from 'react';
import ErrorBoundary from 'atomic-components/ErrorBoundary';
import PageTitle from 'atomic-components/PageTitle';
import ServiceWorkerUpdatePrompt from 'atomic-components/ServiceWorkerUpdatePrompt';
import { useServiceWorker } from 'hooks/useServiceWorker';
import Home from 'pages/home';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

function AppContent() {
  const { registration, isUpdateAvailable } = useServiceWorker();

  return (
    <>
      <PageTitle />
      {registration && isUpdateAvailable && (
        <ServiceWorkerUpdatePrompt registration={registration} />
      )}
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
