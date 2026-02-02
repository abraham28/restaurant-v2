import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './SettingsModal.module.scss';

interface SettingsModalProps {
  show: boolean;
  onHide: () => void;
}

function SettingsModal({ show, onHide }: SettingsModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContent}>
          <p>Settings content will be displayed here.</p>
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

export default SettingsModal;
