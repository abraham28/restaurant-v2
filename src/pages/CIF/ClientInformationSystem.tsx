import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Button from 'atomic-components/Button/Button';
import Radio from 'atomic-components/Radio/Radio';
import { ROUTES } from 'utils/constants';
import styles from './ClientInformationSystem.module.scss';

type ClientType = 'Individual' | 'Company' | 'Government' | 'Organization';

function ClientInformationSystem() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedClientType, setSelectedClientType] =
    useState<ClientType>('Individual');

  const clientTypeOptions: ClientType[] = [
    'Individual',
    'Company',
    'Government',
    'Organization',
  ];

  const handleAdd = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedClientType('Individual'); // Reset to default
  }, []);

  const handleModalOk = useCallback(() => {
    // Navigate based on selected client type
    if (selectedClientType === 'Individual') {
      navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT);
    }
    // TODO: Add navigation for other client types (Company, Government, Organization)
    handleCloseModal();
  }, [navigate, handleCloseModal, selectedClientType]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Information System</h1>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.helloWorld}>Hello World</div>
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
