import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './UserSettingsModal.module.scss';

interface UserSettingsModalProps {
  show: boolean;
  onHide: () => void;
}

function UserSettingsModal({ show, onHide }: UserSettingsModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>User Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContent}>
          <p>User Settings content will be displayed here.</p>
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

export default UserSettingsModal;
