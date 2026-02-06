import React, { useState, useCallback } from 'react';
import Button from 'atomic-components/Button';
import AddBusinessModal from './AddBusinessModal';
import BusinessEntry from './BusinessEntry';
import DeleteConfirmModal from './DeleteConfirmModal';
import type { BusinessFormData } from './types';
import styles from './Business.module.scss';

const Business = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [businesses, setBusinesses] = useState<BusinessFormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleOpenModal = useCallback(() => {
    setEditIndex(null);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditIndex(null);
  }, []);

  const handleEdit = useCallback((index: number) => {
    setEditIndex(index);
    setShowModal(true);
  }, []);

  const handleSuccess = useCallback(
    (data: BusinessFormData) => {
      if (editIndex !== null) {
        setBusinesses((prev) =>
          prev.map((item, i) => (i === editIndex ? data : item)),
        );
      } else {
        setBusinesses((prev) => [...prev, data]);
      }
      setShowModal(false);
      setEditIndex(null);
    },
    [editIndex],
  );

  const handleError = useCallback((message: string) => {
    console.warn('Business form error:', message);
  }, []);

  const handleDeleteClick = useCallback((index: number) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteIndex !== null) {
      setBusinesses((prev) => prev.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
    setShowDeleteModal(false);
  }, [deleteIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h3 className={styles.sectionTitle}>Business</h3>
        <p className={styles.sectionSubtitle}>
          Add and manage business information.
        </p>
        {businesses.length > 0 && (
          <div className={styles.list}>
            {businesses.map((data, index) => (
              <BusinessEntry
                key={`business-${index}`}
                label={`Business Information ${index + 1}`}
                data={data}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDeleteClick(index)}
              />
            ))}
          </div>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenModal}
          className={styles.addButton}
        >
          Add Business
        </Button>
      </div>
      <AddBusinessModal
        show={showModal}
        onHide={handleCloseModal}
        onSuccess={handleSuccess}
        onError={handleError}
        initialData={
          editIndex !== null ? (businesses[editIndex] ?? null) : undefined
        }
      />
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Business;
