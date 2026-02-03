import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './LogoutModal.module.scss';

interface LogoutModalProps {
  show: boolean;
  onHide: () => void;
}

function LogoutModal({ show, onHide }: LogoutModalProps) {
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContent}>
          <p className={styles.logoutMessage}>
            Are you sure you want to logout? This action will end your current
            session.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutModal;
