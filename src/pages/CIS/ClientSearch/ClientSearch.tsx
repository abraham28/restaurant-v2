import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Button from 'atomic-components/Button';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import SelectDropdown from 'atomic-components/SelectDropdown';
import { ROUTES } from 'utils/constants';
import { formatDate } from 'utils/dateUtils';
import localDB from 'localDB';
import {
  useClientFormStore,
  type ClientFormState,
} from 'stores/clientFormStore';
import { useDraftsStore } from 'stores/draftsStore';
import clientTypeData from 'data/cisClientType.json';
import statusData from 'data/cisStatus.json';
import classificationData from 'data/cisClassification.json';
import styles from './ClientSearch.module.scss';

function ClientSearch() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { drafts, loading, loadDrafts, refreshDrafts } = useDraftsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [clientType, setClientType] = useState('');
  const [status, setStatus] = useState('');
  const [classification, setClassification] = useState('');

  // Load filter options from JSON data files
  const clientTypeOptions = useMemo(
    () =>
      (clientTypeData as Array<{ ID: string; ClientType: string }>).map(
        (item) => item.ClientType,
      ),
    [],
  );
  const statusOptions = useMemo(
    () =>
      (statusData as Array<{ ID: string; Status: string }>).map(
        (item) => item.Status,
      ),
    [],
  );
  const classificationOptions = useMemo(
    () =>
      (
        classificationData as Array<{
          ID: string;
          Classification: string;
        }>
      ).map((item) => item.Classification),
    [],
  );

  // Load drafts on component mount
  useEffect(() => {
    void loadDrafts();
  }, [loadDrafts]);

  const resetForm: () => void = useClientFormStore(
    (state: ClientFormState): ClientFormState['resetForm'] => state.resetForm,
  ) as () => void;

  const handleAdd = useCallback(() => {
    resetForm(); // Clear any existing form data
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT);
  }, [resetForm, navigate]);

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
          // Refresh drafts list from store
          await refreshDrafts();
        } catch (error) {
          console.error('Failed to delete draft:', error);
          alert(t('failedToDeleteDraft'));
        }
      }
    },
    [t, refreshDrafts],
  );

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('clientSearch')}</h1>
      </div>
      <div className={styles.filtersContainer}>
        <AutocompleteInput
          value={searchQuery}
          onChange={setSearchQuery}
          suggestions={[]}
          placeholder={t('searchClients')}
          width="300px"
        />
        <SelectDropdown
          value={clientType}
          onChange={setClientType}
          options={clientTypeOptions}
          placeholder={t('clientType')}
          width="fit-content"
        />
        <SelectDropdown
          value={status}
          onChange={setStatus}
          options={statusOptions}
          placeholder={t('status')}
          width="fit-content"
        />
        <SelectDropdown
          value={classification}
          onChange={setClassification}
          options={classificationOptions}
          placeholder={t('classification')}
          width="fit-content"
        />
        <Button variant="primary" onClick={handleAdd}>
          <Plus size={16} style={{ marginRight: '8px' }} />
          {t('addClient')}
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.draftsSection}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner} aria-hidden="true" />
              <p className={styles.loadingText}>{t('loading')}</p>
            </div>
          ) : drafts.length === 0 ? (
            <div className={styles.emptyState}>{t('noClientsFound')}</div>
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
    </>
  );
}

export default ClientSearch;
