import React from 'react';
import ErrorBoundary from 'atomic-components/ErrorBoundary/ErrorBoundary';
import PageTitle from 'atomic-components/PageTitle/PageTitle';
import ServiceWorkerUpdatePrompt from 'atomic-components/ServiceWorkerUpdatePrompt/ServiceWorkerUpdatePrompt';
import { useServiceWorker } from 'hooks/useServiceWorker';
import Home from 'pages/home';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'utils/constants';
import ClientInformationSystem from 'pages/CIF/ClientInformationSystem';
import CIFInsert from 'pages/CIFInsert/CIFInsert';
import CsvToJson from 'pages/CsvToJson';

function AppContent() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route
        path={ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT}
        element={<ClientInformationSystem />}
      />
      <Route
        path={ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT}
        element={<CIFInsert />}
      />
      <Route path={ROUTES.CSV_UTILS.CSV_TO_JSON} element={<CsvToJson />} />
    </Routes>
  );
}

function App() {
  const { registration, isUpdateAvailable } = useServiceWorker();

  return (
    <ErrorBoundary>
      <PageTitle />
      {registration && isUpdateAvailable && (
        <ServiceWorkerUpdatePrompt registration={registration} />
      )}
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
