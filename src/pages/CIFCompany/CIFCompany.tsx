import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Button from 'atomic-components/Button/Button';
import RequiredFieldBullet from 'atomic-components/RequiredFieldBullet/RequiredFieldBullet';
import { ROUTES } from 'utils/constants';
import { useClientFormStore, ClientFormData } from 'stores/clientFormStore';
import { generateDraftId } from 'utils/indexedDBUtils';
import IndividualTab from './Company/Company';
import ContactsTab from './Contacts/Contacts';
import DocumentsTab from './Documents/Documents';
import EmploymentTab from './Employment/Employment';
import BusinessTab from './Business/Business';
import FinancialTab from './Financial/Financial';
import AmlaTab from './Amla/Amla';
import RemarksTab from './Remarks/Remarks';
import PictureTab from './Picture/Picture';
import styles from './CIFCompany.module.scss';

type TabType =
  | 'individual'
  | 'contacts'
  | 'documents'
  | 'employment'
  | 'business'
  | 'financial'
  | 'amla'
  | 'remarks'
  | 'picture';

function ClientInformationSystemInsert() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Zustand store hooks
  const formData = useClientFormStore((state) => state.formData);
  const activeTab = useClientFormStore((state) => state.activeTab);
  const isLoading = useClientFormStore((state) => state.isLoading);
  const draftId = useClientFormStore((state) => state.draftId);
  const setFormData = useClientFormStore((state) => state.setFormData);
  const setActiveTab = useClientFormStore((state) => state.setActiveTab);
  const resetForm = useClientFormStore((state) => state.resetForm);
  const setDraftId = useClientFormStore((state) => state.setDraftId);
  const setClientType = useClientFormStore((state) => state.setClientType);
  const loadFormFromIndexedDB = useClientFormStore(
    (state) => state.loadFormFromIndexedDB,
  );

  // Load saved form data from IndexedDB on component mount
  // Don't render until data is synced
  useEffect(() => {
    const loadData = async () => {
      // Set client type to Company for this page
      setClientType('Company');
      await loadFormFromIndexedDB();
      // Generate draft ID if not exists (for new forms)
      if (!draftId) {
        setDraftId(generateDraftId());
      }
      setIsInitialLoadComplete(true);
    };
    void loadData();
  }, [loadFormFromIndexedDB, draftId, setDraftId, setClientType]);

  const handleInputChange = useCallback(
    (field: keyof ClientFormData, value: string | number | boolean) => {
      setFormData({ [field]: value });
    },
    [setFormData],
  );

  // Auto-calculate noOfDependents when dependent fields change
  useEffect(() => {
    const total =
      formData.elementaryDependents +
      formData.highSchoolDependents +
      formData.collegeDependents;
    if (formData.noOfDependents !== total) {
      setFormData({ noOfDependents: total });
    }
  }, [
    formData.elementaryDependents,
    formData.highSchoolDependents,
    formData.collegeDependents,
    formData.noOfDependents,
    setFormData,
  ]);

  const handleSave = useCallback(() => {
    // Save functionality will be implemented later
    console.log('Save clicked', formData);
  }, [formData]);

  const handleCancel = useCallback(() => {
    resetForm(); // Clear form data and IndexedDB
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.ROOT);
  }, [navigate, resetForm]);

  const handleOpenModal = useCallback((title: string) => {
    setModalTitle(title);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setModalTitle('');
  }, []);

  const handleModalOk = useCallback(() => {
    // No function - just close the modal
    handleCloseModal();
  }, [handleCloseModal]);

  const handleCompanyInputChange = useCallback(
    (field: string, value: string | number) => {
      setFormData({ [field]: value } as Partial<ClientFormData>);
    },
    [setFormData],
  );

  const handleCompanyDateChange = useCallback(
    (field: string, date: string) => {
      setFormData({ [field]: date } as Partial<ClientFormData>);
    },
    [setFormData],
  );

  // Don't render until initial data sync is complete
  // This ensures form fields are populated with saved data before rendering
  // IMPORTANT: This check must be AFTER all hooks are called
  if (!isInitialLoadComplete || isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div>Loading form data...</div>
        </div>
      </div>
    );
  }

  // Mock data for dropdowns
  const countryCodeOptions = ['+63', '+1', '+44', '+61', '+65', '+66'];
  const idTypeOptions = [
    "Driver's License",
    'Passport',
    'SSS ID',
    'TIN ID',
    'PhilHealth ID',
    'Postal ID',
    'National ID',
    "Voter's ID",
    'PRC ID',
    'Company ID',
    'School ID',
    'Other',
  ];
  const salaryIndicatorOptions = ['Monthly', 'Weekly', 'Bi-weekly', 'Yearly'];
  const dosriOptions = ['Yes', 'No', 'N/A'];
  const relatedPartyOptions = ['None', 'Related', 'Affiliate'];
  const customerDueDiligenceOptions = [
    'None',
    'Simplified',
    'Standard',
    'Enhanced',
  ];
  const clientStatusOptions = ['Active', 'Inactive', 'Suspended', 'Closed'];
  const companyTypeOptions = [
    'None',
    'Corporation and Partnerships',
    'One Person Corporation',
    'Sole or One Proprietorship',
  ];
  const firmSizeOptions = ['None', 'Small', 'Medium', 'Large'];

  const tabs: { id: TabType; label: string }[] = [
    { id: 'individual', label: 'Company' },
    { id: 'contacts', label: 'Contacts/Addresses/IDs' },
    { id: 'documents', label: 'Documents' },
    { id: 'employment', label: 'Employment' },
    { id: 'business', label: 'Business' },
    { id: 'financial', label: 'Financial' },
    { id: 'amla', label: 'AMLA/Tags' },
    { id: 'remarks', label: 'Remarks/Groupings' },
    { id: 'picture', label: 'Picture / Signature' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Information System - Insert</h1>
        <div className={styles.headerActions}>
          <div className={styles.requiredFields}>
            Required Fields:{' '}
            <span className={styles.requiredText}>
              CIC <RequiredFieldBullet /> AMLA{' '}
              <RequiredFieldBullet type="amla" />
            </span>
          </div>
          <div className={styles.buttons}>
            <Button variant="primary" onClick={handleSave}>
              Save <span className={styles.shortcut}>[F4]</span>
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.tabActive : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'individual' && (
          <IndividualTab
            formData={{
              companyType:
                formData.companyType || 'Corporation and Partnerships',
              companyName: formData.companyName || '',
              registeredName: formData.registeredName || '',
              tin: formData.tin || '',
              startOfBusiness: formData.startOfBusiness || '1900-01-01',
              numberOfEmployees: formData.numberOfEmployees || 0,
              trader1: formData.trader1 || '',
              trader2: formData.trader2 || '',
              firmSize: formData.firmSize || 'None',
              conglomerateDomain: formData.conglomerateDomain || '',
              entityLocation: formData.entityLocation || '',
              countryOfOrigin: formData.countryOfOrigin || '',
              placeOfRegistration: formData.placeOfRegistration || '',
              legalForm: formData.legalForm || '',
              industry: formData.industry || '',
              originOfEntity: formData.originOfEntity || '',
              businessActivity: formData.businessActivity || '',
              netTaxableIncome: formData.netTaxableIncome || 0,
              monthlyExpenses: formData.monthlyExpenses || 0,
              parentClient: formData.parentClient || '',
              roleOfParent: formData.roleOfParent || '',
              contactPerson: formData.contactPerson || '',
              designation: formData.designation || '',
              nationality: formData.nationality || 'Filipino',
            }}
            onInputChange={handleCompanyInputChange}
            onDateChange={handleCompanyDateChange}
            companyTypeOptions={companyTypeOptions}
            firmSizeOptions={firmSizeOptions}
          />
        )}

        {activeTab === 'contacts' && (
          <ContactsTab
            formData={formData}
            onInputChange={handleInputChange}
            onOpenModal={handleOpenModal}
            idTypeOptions={idTypeOptions}
            countryCodeOptions={countryCodeOptions}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsTab formData={formData} onInputChange={handleInputChange} />
        )}

        {activeTab === 'employment' && (
          <EmploymentTab
            formData={formData}
            onInputChange={handleInputChange}
          />
        )}

        {activeTab === 'business' && (
          <BusinessTab formData={formData} onInputChange={handleInputChange} />
        )}

        {activeTab === 'financial' && (
          <FinancialTab
            formData={formData}
            onInputChange={handleInputChange}
            onOpenModal={handleOpenModal}
            salaryIndicatorOptions={salaryIndicatorOptions}
          />
        )}

        {activeTab === 'amla' && (
          <AmlaTab
            formData={formData}
            onInputChange={handleInputChange}
            onOpenModal={handleOpenModal}
            dosriOptions={dosriOptions}
            relatedPartyOptions={relatedPartyOptions}
            customerDueDiligenceOptions={customerDueDiligenceOptions}
          />
        )}

        {activeTab === 'remarks' && (
          <RemarksTab
            formData={formData}
            onInputChange={handleInputChange}
            clientStatusOptions={clientStatusOptions}
          />
        )}

        {activeTab === 'picture' && (
          <PictureTab
            formData={{
              clientPicture1: formData.clientPicture1,
              clientPicture2: formData.clientPicture2,
              signaturePicture1: formData.signaturePicture1,
              signaturePicture2: formData.signaturePicture2,
            }}
            onInputChange={(field, value) => handleInputChange(field, value)}
          />
        )}
      </div>

      {/* Empty Modal for List Buttons */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* Empty modal body */}</Modal.Body>
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

export default ClientInformationSystemInsert;
