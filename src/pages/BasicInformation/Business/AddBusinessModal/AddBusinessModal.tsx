import React, { useState, useCallback, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'atomic-components/Button';
import CompanyEmployerName from '../CompanyEmployerName';
import TIN from '../TIN';
import UpdatedDateTime from '../UpdatedDateTime';
import OwnerLease from '../OwnerLease';
import OccupiedSince from '../OccupiedSince';
import PrimaryAddress from '../PrimaryAddress';
import SecondaryAddress from '../SecondaryAddress';
import PrimaryContact from '../PrimaryContact';
import SecondaryContact from '../SecondaryContact';
import { initialBusinessFormData, type BusinessFormData } from '../types';
import type { AddBusinessModalProps, BusinessFormErrors } from './types';
import styles from './AddBusinessModal.module.scss';

const REQUIRED_FIELD_MESSAGE = 'This field is required';

function AddBusinessModal({
  show,
  onHide,
  onSuccess,
  onError,
  initialData,
}: AddBusinessModalProps) {
  const [formData, setFormData] = useState<BusinessFormData>(
    initialBusinessFormData,
  );
  const [errors, setErrors] = useState<BusinessFormErrors>({});

  const resetForm = useCallback(() => {
    setFormData(initialBusinessFormData);
    setErrors({});
  }, []);

  useEffect(() => {
    if (show) {
      if (initialData) {
        setFormData(initialData);
      } else {
        resetForm();
      }
      setErrors({});
    }
  }, [show, initialData, resetForm]);

  const validate = useCallback((): boolean => {
    const nextErrors: BusinessFormErrors = {};

    if (!formData.companyEmployerName?.trim()) {
      nextErrors.companyEmployerName = REQUIRED_FIELD_MESSAGE;
    }
    if (!formData.tin?.trim()) {
      nextErrors.tin = REQUIRED_FIELD_MESSAGE;
    }
    if (!formData.primaryAddress?.trim()) {
      nextErrors.primaryAddress = REQUIRED_FIELD_MESSAGE;
    }
    if (!formData.primaryContact?.trim()) {
      nextErrors.primaryContact = REQUIRED_FIELD_MESSAGE;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(() => {
    if (!validate()) {
      onError?.('Please fill in all required fields.');
      return;
    }
    onSuccess(formData);
    onHide();
  }, [formData, validate, onSuccess, onHide, onError]);

  const isEditMode = Boolean(initialData);

  const handleCancel = useCallback(() => {
    resetForm();
    onHide();
  }, [onHide, resetForm]);

  const updateField = useCallback(
    <K extends keyof BusinessFormData>(
      field: K,
      value: BusinessFormData[K],
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof BusinessFormErrors]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field as keyof BusinessFormErrors];
          return next;
        });
      }
    },
    [errors],
  );

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      centered
      size="lg"
      className={styles.modal}
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          {isEditMode ? 'Edit Business' : 'Add Business'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Business Information</h3>
          <p className={styles.sectionSubtitle}>
            Enter the business details below.
          </p>
          <div className={styles.formLayout}>
            <div className={styles.rowThreeCols}>
              <CompanyEmployerName
                value={formData.companyEmployerName}
                onChange={(v: string) => updateField('companyEmployerName', v)}
                error={errors.companyEmployerName}
                required
              />
              <OwnerLease
                value={formData.ownerLease}
                onChange={(v: string) => updateField('ownerLease', v)}
              />
              <TIN
                value={formData.tin}
                onChange={(v: string) => updateField('tin', v)}
                error={errors.tin}
                required
              />
            </div>
            <div className={styles.rowTwoCols}>
              <UpdatedDateTime
                value={formData.updatedDateTime}
                onChange={(v: string) => updateField('updatedDateTime', v)}
              />
              <OccupiedSince
                value={formData.occupiedSince}
                onChange={(v: string) => updateField('occupiedSince', v)}
              />
            </div>
            <div className={styles.rowAddressContact}>
              <div className={styles.addressColumn}>
                <PrimaryAddress
                  value={formData.primaryAddress}
                  onChange={(v: string) => updateField('primaryAddress', v)}
                  error={errors.primaryAddress}
                  required
                />
                <SecondaryAddress
                  value={formData.secondaryAddress}
                  onChange={(v: string) => updateField('secondaryAddress', v)}
                />
              </div>
              <div className={styles.contactColumn}>
                <PrimaryContact
                  value={formData.primaryContact}
                  onChange={(v: string) => updateField('primaryContact', v)}
                  error={errors.primaryContact}
                  required
                />
                <SecondaryContact
                  value={formData.secondaryContact}
                  onChange={(v: string) => updateField('secondaryContact', v)}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEditMode ? 'Save' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBusinessModal;
