import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'atomic-components/Button';
import styles from './DeleteConfirmModal.module.scss';

interface DeleteConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

function DeleteConfirmModal({
  show,
  onHide,
  onConfirm,
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Delete Business</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <p className={styles.message}>Are you sure you want to delete this?</p>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
