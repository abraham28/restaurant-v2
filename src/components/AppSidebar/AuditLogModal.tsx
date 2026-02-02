import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './AuditLogModal.module.scss';

interface AuditLogModalProps {
  show: boolean;
  onHide: () => void;
}

function AuditLogModal({ show, onHide }: AuditLogModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Audit Log</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContent}>
          <p>Audit Log content will be displayed here.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AuditLogModal;
