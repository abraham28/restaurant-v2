import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Button from 'atomic-components/Button';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import SelectDropdown from 'atomic-components/SelectDropdown';
import { ROUTES } from 'utils/constants';
import { formatDate } from 'utils/dateUtils';
import localDB, { type DraftMetadata } from 'localDB';
import {
  useClientFormStore,
  type ClientFormState,
} from 'stores/clientFormStore';
import styles from './ClientInformationSystem.module.scss';

function ClientInformationSystem() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [drafts, setDrafts] = useState<DraftMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientType, setClientType] = useState('');
  const [status, setStatus] = useState('');
  const [classification, setClassification] = useState('');

  // Hardcoded filter options
  const clientTypeOptions = [
    'Individual',
    'Company',
    'Organization',
    'Business',
  ];
  const statusOptions = [
    'Active',
    'Inactive',
    'Pending',
    'Suspended',
    'Closed',
  ];
  const classificationOptions = [
    'Retail',
    'Corporate',
    'SME',
    'High Net Worth',
    'Institutional',
  ];

  const resetForm: () => void = useClientFormStore(
    (state: ClientFormState): ClientFormState['resetForm'] => state.resetForm,
  ) as () => void;

  // Load drafts on component mount
  useEffect(() => {
    const loadDrafts = async () => {
      setLoading(true);
      try {
        const allDrafts = await localDB.getAllDrafts();
        setDrafts(allDrafts);
      } catch (error) {
        console.error('Failed to load drafts:', error);
      } finally {
        setLoading(false);
      }
    };
    void loadDrafts();
  }, []);

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
          {drafts.length === 0 ? (
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
    </div>
  );
}

export default ClientInformationSystem;
