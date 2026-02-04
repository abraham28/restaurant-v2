import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './AssessmentModal.module.scss';

interface AssessmentModalProps {
  show: boolean;
  onHide: () => void;
}

function AssessmentModal({ show, onHide }: AssessmentModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Assessment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContent}>
          <p>Assessment content will be displayed here.</p>
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

export default AssessmentModal;
