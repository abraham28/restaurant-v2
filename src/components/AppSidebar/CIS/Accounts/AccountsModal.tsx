import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './AccountsModal.module.scss';

interface AccountsModalProps {
  show: boolean;
  onHide: () => void;
}

function AccountsModal({ show, onHide }: AccountsModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Accounts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContent}>
          <p>Accounts content will be displayed here.</p>
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

export default AccountsModal;
