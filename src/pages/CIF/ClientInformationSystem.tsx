import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Button from 'atomic-components/Button/Button';
import Radio from 'atomic-components/Radio/Radio';
import { ROUTES } from 'utils/constants';
import {
  getAllDrafts,
  deleteDraft,
  type DraftMetadata,
} from 'utils/indexedDBUtils';
import { useClientFormStore } from 'stores/clientFormStore';
import styles from './ClientInformationSystem.module.scss';

type ClientType = 'Individual' | 'Company' | 'Government' | 'Organization';

function ClientInformationSystem() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [selectedClientType, setSelectedClientType] =
    useState<ClientType>('Individual');
  const [drafts, setDrafts] = useState<DraftMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  const resetForm = useClientFormStore((state) => state.resetForm);

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
      const allDrafts = await getAllDrafts();
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
      if (window.confirm('Are you sure you want to delete this draft?')) {
        try {
          await deleteDraft(draftId);
          // Reload drafts list
          const allDrafts = await getAllDrafts();
          setDrafts(allDrafts);
        } catch (error) {
          console.error('Failed to delete draft:', error);
          alert('Failed to delete draft. Please try again.');
        }
      }
    },
    [],
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
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Information System</h1>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.draftsSection}>
          <h2 className={styles.draftsTitle}>Drafts</h2>
          {drafts.length === 0 ? (
            <div className={styles.emptyState}>No drafts found</div>
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
                      Updated: {formatDate(draft.updatedAt)}
                    </span>
                    {draft.createdAt !== draft.updatedAt && (
                      <span className={styles.draftDate}>
                        Created: {formatDate(draft.createdAt)}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      void handleDeleteDraft(draft.id, e);
                    }}
                    className={styles.deleteButton}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Client Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.modalContent}>
            <label className={styles.label}>Client Type:</label>
            <Radio
              value={selectedClientType}
              onChange={(value) => setSelectedClientType(value as ClientType)}
              options={clientTypeOptions}
              placeholder="Select client type"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClientInformationSystem;
