import React from 'react';
import ErrorBoundary from 'atomic-components/ErrorBoundary';
import PageTitle from 'atomic-components/PageTitle';
import ServiceWorkerUpdatePrompt from 'atomic-components/ServiceWorkerUpdatePrompt';
import { useServiceWorker } from 'hooks/useServiceWorker';
import Home from 'pages/home';
import ClientInformationSystem from 'pages/client-information-system';
import ClientInformationSystemInsert from 'pages/client-information-system/ClientInformationSystemInsert';
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
        <Route
          path={ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT}
          element={<ClientInformationSystem />}
        />
        <Route
          path={ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT}
          element={<ClientInformationSystemInsert />}
        />
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
