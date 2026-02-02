import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import Button from 'atomic-components/Button';
import Radio from 'atomic-components/Radio/Radio';
import { ROUTES } from 'utils/constants';
import localDB, { type DraftMetadata } from 'localDB';
import {
  useClientFormStore,
  type ClientFormState,
} from 'stores/clientFormStore';
import styles from './ClientInformationSystem.module.scss';

type ClientType = 'Individual' | 'Company' | 'Government' | 'Organization';

function ClientInformationSystem() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedClientType, setSelectedClientType] =
    useState<ClientType>('Individual');
  const [drafts, setDrafts] = useState<DraftMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const resetForm: () => void = useClientFormStore(
    (state: ClientFormState): ClientFormState['resetForm'] => state.resetForm,
  ) as () => void;

  const clientTypeOptions: ClientType[] = [
    'Individual',
    'Company',
    'Government',
    'Organization',
  ];

  // Load drafts function
  const loadDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const allDrafts = await localDB.getAllDrafts();
      setDrafts(allDrafts);
    } catch (error) {
      console.error('Failed to load drafts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load drafts on component mount and when location changes (user navigates back)
  useEffect(() => {
    void loadDrafts();
  }, [loadDrafts, location.pathname]);

  const handleAdd = useCallback(() => {
    resetForm(); // Clear any existing form data
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT);
  }, [resetForm, navigate]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedClientType('Individual'); // Reset to default
  }, []);

  const handleModalOk = useCallback(() => {
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT);
    handleCloseModal();
  }, [navigate, handleCloseModal]);

  const handleDraftClick = useCallback(
    (draftId: string) => {
      // Navigate to /client-information-system/new with draftId so CIFInsert restores the draft
      navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT, {
        state: { draftId },
      });
    },
    [navigate],
  );

  const handleDeleteDraft = useCallback(
    async (draftId: string, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent triggering draft click
      if (window.confirm(t('confirmDeleteDraft'))) {
        try {
          await localDB.deleteDraft(draftId);
          // Reload drafts list
          const allDrafts = await localDB.getAllDrafts();
          setDrafts(allDrafts);
        } catch (error) {
          console.error('Failed to delete draft:', error);
          alert(t('failedToDeleteDraft'));
        }
      }
    },
    [t],
  );

  const formatDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  if (loading) {
    return (
      <div className={styles.pageLoading}>
        <div className={styles.loadingSpinner} aria-hidden="true" />
        <p className={styles.loadingText}>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('clientInformationSystem')}</h1>
        <Button variant="primary" onClick={handleAdd}>
          {t('add')}
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.draftsSection}>
          <h2 className={styles.draftsTitle}>{t('drafts')}</h2>
          {drafts.length === 0 ? (
            <div className={styles.emptyState}>{t('noDraftsFound')}</div>
          ) : (
            <div className={styles.draftsList}>
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className={styles.draftItem}
                  onClick={() => {
                    void handleDraftClick(draft.id);
                  }}
                >
                  <div className={styles.draftContent}>
                    <span className={styles.draftName}>
                      {draft.clientName}
                      {draft.clientType && (
                        <span className={styles.clientTypeIndicator}>
                          {' '}
                          - {draft.clientType}
                        </span>
                      )}
                    </span>
                    <span className={styles.draftDate}>
                      {t('updated')}: {formatDate(draft.updatedAt)}
                    </span>
                    {draft.createdAt !== draft.updatedAt && (
                      <span className={styles.draftDate}>
                        {t('created')}: {formatDate(draft.createdAt)}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      void handleDeleteDraft(draft.id, e);
                    }}
                    className={styles.deleteButton}
                  >
                    {t('delete')}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('selectClientType')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.modalContent}>
            <label className={styles.label}>{t('clientType')}:</label>
            <Radio
              value={selectedClientType}
              onChange={(value) => setSelectedClientType(value as ClientType)}
              options={clientTypeOptions}
              placeholder={t('selectClientTypePlaceholder')}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleModalOk}>
            {t('ok')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClientInformationSystem;
