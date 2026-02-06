import React from 'react';
import ErrorBoundary from 'atomic-components/ErrorBoundary/ErrorBoundary';
import PageTitle from 'atomic-components/PageTitle/PageTitle';
import ServiceWorkerUpdatePrompt from 'atomic-components/ServiceWorkerUpdatePrompt/ServiceWorkerUpdatePrompt';
import ContentWrapper from 'atomic-components/ContentWrapper';
import MobileNotice from 'atomic-components/MobileNotice';
import AppHeader from 'components/AppHeader';
import AppSidebar from 'components/AppSidebar';
import { useServiceWorker } from 'hooks/useServiceWorker';
import Home from 'pages/Home';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'utils/constants';
import ClientInformationSystem from 'pages/CIS/ClientInformationSystem';
import CsvToJson from 'pages/CsvToJson';
import PageNotFound from 'pages/PageNotFound';
import BasicInformation from 'pages/BasicInformation';

function AppContent() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route
        path={ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT}
        element={<ClientInformationSystem />}
      />
      <Route path={ROUTES.CSV_UTILS.CSV_TO_JSON} element={<CsvToJson />} />
      <Route
        path={ROUTES.CLIENT_INFORMATION_SYSTEM.BASIC_INFORMATION}
        element={<BasicInformation />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  const { registration, isUpdateAvailable } = useServiceWorker();

  return (
    <ErrorBoundary>
      <MobileNotice />
      <PageTitle />
      <AppHeader />
      <AppSidebar />
      {registration && isUpdateAvailable && (
        <ServiceWorkerUpdatePrompt registration={registration} />
      )}
      <ContentWrapper>
        <AppContent />
      </ContentWrapper>
    </ErrorBoundary>
  );
}

export default App;
