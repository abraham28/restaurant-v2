import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './CustomerDetailsModal.module.scss';

interface CustomerDetailsModalProps {
  show: boolean;
  onHide: () => void;
}

function CustomerDetailsModal({ show, onHide }: CustomerDetailsModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContent}>
          <p>Customer Details content will be displayed here.</p>
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

export default CustomerDetailsModal;
