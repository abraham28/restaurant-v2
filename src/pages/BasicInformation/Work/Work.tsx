import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DateInput from 'atomic-components/DateInput';
import Button from 'atomic-components/Button';
import PhoneNumberInput from 'atomic-components/PhoneNumberInput';
import TextInput from 'atomic-components/TextInput/TextInput';
import Textarea from 'atomic-components/Textarea/Textarea';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useWorkFormStore } from 'stores/WorkFormStore';
import type { WorkFormData, WorkEntry } from 'types/workForm';
import styles from './Work.module.scss';
import Address from './Address';
import ContactNo from './ContactNo';
import ContactPerson from './ContactPerson';
import DateEmployedBusinessStartedRetired from './DateEmployedBusinessStartedRetired';
import EmployerBusinessActivity from './EmployerBusinessActivity';
import EmployerIndustry from './EmployerIndustry';
import EmployerName from './EmployerName';
import GrossIncome from './GrossIncome';
import Occupation from './Occupation';
import OccupationStatus from './OccupationStatus';
import OtherIncome from './OtherIncome';
import OtherIncomeSource from './OtherIncomeSource';
import OtherIncomeSourceAmount from './OtherIncomeSourceAmount';
import PositionJobTitle from './PositionJobTitle';
import Salary from './Salary';
import SalaryIndicator from './SalaryIndicator';
import SourceOfFundWealth from './SourceOfFundWealth';
import TIN from './TIN';

export interface WorkProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
  /** When set, modal opens in edit mode with this entry's data pre-filled */
  editingEntryId?: string | null;
}

const noop = () => {};

export function WorkDetailsFields({ entry }: { entry: WorkEntry }) {
  return (
    <>
      <h4 className={styles.workDetailsSectionTitle}>Employment & Employer</h4>
      <div className={styles.workDetailsGrid}>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Occupation</label>
          <TextInput
            value={entry.occupation}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Occupation Status</label>
          <TextInput
            value={entry.occupationStatus}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsGridFull}>
          <div className={styles.workDetailsField}>
            <label className={styles.workDetailsLabel}>
              Position / Job Title
            </label>
            <TextInput
              value={entry.positionJobTitle}
              onChange={noop}
              disabled
              readOnly
            />
          </div>
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>
            Date Employed / Business Started / Retired
          </label>
          <DateInput
            value={entry.dateEmployedBusinessStartedRetired}
            onChange={noop}
            disabled
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Employer Name</label>
          <TextInput
            value={entry.employerName}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>TIN</label>
          <TextInput value={entry.tin} onChange={noop} disabled readOnly />
        </div>
        <div className={styles.workDetailsGridFull}>
          <div className={styles.workDetailsField}>
            <label className={styles.workDetailsLabel}>Address</label>
            <Textarea value={entry.address} onChange={noop} disabled rows={3} />
          </div>
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Contact Person</label>
          <TextInput
            value={entry.contactPerson}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>
            Employer Business Activity
          </label>
          <TextInput
            value={entry.employerBusinessActivity}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Employer Industry</label>
          <TextInput
            value={entry.employerIndustry}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Contact No.</label>
          <PhoneNumberInput value={entry.contactNo} onChange={noop} disabled />
        </div>
      </div>
      <h4 className={styles.workDetailsSectionTitle}>Income</h4>
      <div className={styles.workDetailsGrid}>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Salary Indicator</label>
          <TextInput
            value={entry.salaryIndicator}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>
            Source of Fund / Wealth
          </label>
          <TextInput
            value={entry.sourceOfFundWealth}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Salary</label>
          <TextInput
            type="number"
            value={entry.salary}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Gross Income</label>
          <TextInput
            type="number"
            value={entry.grossIncome}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Other Income</label>
          <TextInput
            value={entry.otherIncome}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>Other Income Source</label>
          <TextInput
            value={entry.otherIncomeSource}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
        <div className={styles.workDetailsField}>
          <label className={styles.workDetailsLabel}>
            Other Income Source Amount
          </label>
          <TextInput
            type="number"
            value={entry.otherIncomeSourceAmount}
            onChange={noop}
            disabled
            readOnly
          />
        </div>
      </div>
    </>
  );
}

const REQUIRED_FIELDS: (keyof WorkFormData)[] = [
  'occupation',
  'occupationStatus',
  'positionJobTitle',
  'dateEmployedBusinessStartedRetired',
  'employerName',
  'address',
  'contactPerson',
  'employerIndustry',
  'contactNo',
  'salaryIndicator',
  'salary',
  'grossIncome',
];

function validateForm(
  data: WorkFormData,
): Partial<Record<keyof WorkFormData, string>> {
  const errors: Partial<Record<keyof WorkFormData, string>> = {};
  for (const field of REQUIRED_FIELDS) {
    const value = data[field];
    if (value === undefined || String(value).trim() === '') {
      errors[field] = 'This field is required';
    }
  }
  return errors;
}

const Work = ({
  show,
  onHide,
  onSuccess,
  editingEntryId = null,
}: WorkProps) => {
  const workFormData = useWorkFormStore((state) => state.workFormData);
  const setWorkFormData = useWorkFormStore((state) => state.setWorkFormData);
  const setWorkFormErrors = useWorkFormStore(
    (state) => state.setWorkFormErrors,
  );
  const resetWorkForm = useWorkFormStore((state) => state.resetWorkForm);
  const addWorkEntry = useWorkFormStore((state) => state.addWorkEntry);
  const updateWorkEntry = useWorkFormStore((state) => state.updateWorkEntry);
  const workEntries = useWorkFormStore((state) => state.workEntries);

  useEffect(() => {
    if (show) {
      if (editingEntryId) {
        const entry = workEntries.find((e) => e.id === editingEntryId);
        if (entry) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars -- id excluded when loading entry into form
          const { id, ...data } = entry;
          setWorkFormData(data);
        }
      } else {
        resetWorkForm();
      }
    }
  }, [show, editingEntryId, workEntries, setWorkFormData, resetWorkForm]);

  const handleSave = useCallback(() => {
    const errors = validateForm(workFormData);
    setWorkFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (editingEntryId) {
      updateWorkEntry(editingEntryId, workFormData);
    } else {
      addWorkEntry(workFormData);
    }
    resetWorkForm();
    onHide();
    onSuccess?.();
  }, [
    workFormData,
    editingEntryId,
    setWorkFormErrors,
    addWorkEntry,
    updateWorkEntry,
    resetWorkForm,
    onHide,
    onSuccess,
  ]);

  const handleCancel = useCallback(() => {
    resetWorkForm();
    onHide();
  }, [resetWorkForm, onHide]);

  return (
    <Modal show={show} onHide={handleCancel} centered size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          Work / Financial Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <h4 className={styles.sectionTitle}>Employment & Employer</h4>
        <div className={styles.formGrid}>
          <Occupation />
          <OccupationStatus />
          <div className={styles.formGridFull}>
            <PositionJobTitle />
          </div>
          <DateEmployedBusinessStartedRetired />
          <EmployerName />
          <TIN />
          <div className={styles.formGridFull}>
            <Address />
          </div>
          <ContactPerson />
          <EmployerBusinessActivity />
          <EmployerIndustry />
          <ContactNo />
        </div>

        <h4 className={styles.sectionTitle}>Income</h4>
        <div className={styles.formGrid}>
          <SalaryIndicator />
          <SourceOfFundWealth />
          <Salary />
          <GrossIncome />
          <OtherIncome />
          <OtherIncomeSource />
          <OtherIncomeSourceAmount />
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {editingEntryId ? 'Save' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export function WorkSection() {
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const workEntries = useWorkFormStore((state) => state.workEntries);
  const removeWorkEntry = useWorkFormStore((state) => state.removeWorkEntry);

  const openAddWork = useCallback(() => {
    setEditingEntryId(null);
    setShowWorkModal(true);
  }, []);

  const openEditWork = useCallback(() => {
    if (workEntries.length > 0) {
      setEditingEntryId(workEntries[0].id);
      setShowWorkModal(true);
    }
  }, [workEntries]);

  const closeWorkModal = useCallback(() => {
    setShowWorkModal(false);
    setEditingEntryId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (workEntries.length > 0) {
      removeWorkEntry(workEntries[0].id);
      setShowDeleteConfirm(false);
    }
  }, [workEntries, removeWorkEntry]);

  const openDeleteConfirm = useCallback(() => setShowDeleteConfirm(true), []);
  const closeDeleteConfirm = useCallback(() => setShowDeleteConfirm(false), []);

  const currentEntry = workEntries.length > 0 ? workEntries[0] : null;

  return (
    <>
      <div
        className={`${styles.formCardBottom} ${
          workEntries.length > 0 ? styles.formCardBottomConnected : ''
        }`}
      >
        <div className={styles.workSectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>
              Work / Financial Information
            </h3>
            <p className={styles.sectionSubtitle}>
              Employment and income details.
            </p>
          </div>
          {currentEntry ? (
            <div className={styles.workActionButtons}>
              <Button
                variant="secondary"
                onClick={openEditWork}
                className={styles.editButton}
              >
                <Pencil size={18} aria-hidden />
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={openDeleteConfirm}
                className={styles.trashButton}
              >
                <Trash2 size={18} aria-hidden />
                Trash
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              onClick={openAddWork}
              className={styles.addWorkButton}
            >
              <Plus size={18} aria-hidden />
              Add Work
            </Button>
          )}
        </div>
      </div>
      {currentEntry && (
        <div className={styles.formCardWorkDetails}>
          <WorkDetailsFields entry={currentEntry} />
        </div>
      )}
      <Work
        show={showWorkModal}
        onHide={closeWorkModal}
        onSuccess={closeWorkModal}
        editingEntryId={editingEntryId}
      />
      <Modal
        show={showDeleteConfirm}
        onHide={closeDeleteConfirm}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Work Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.deleteConfirmText}>
            Are you sure you want to delete this work/financial information?
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="secondary" onClick={closeDeleteConfirm}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Work;
