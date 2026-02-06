import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import IconButton from 'atomic-components/IconButton';
import CompanyEmployerName from '../CompanyEmployerName';
import TIN from '../TIN';
import UpdatedDateTime from '../UpdatedDateTime';
import OwnerLease from '../OwnerLease';
import OccupiedSince from '../OccupiedSince';
import PrimaryAddress from '../PrimaryAddress';
import SecondaryAddress from '../SecondaryAddress';
import PrimaryContact from '../PrimaryContact';
import SecondaryContact from '../SecondaryContact';
import type { BusinessFormData } from '../types';
import styles from './BusinessEntry.module.scss';

const noop = () => {};

interface BusinessEntryProps {
  data: BusinessFormData;
  label: string;
  onEdit: () => void;
  onDelete: () => void;
}

const BusinessEntry = ({
  data,
  label,
  onEdit,
  onDelete,
}: BusinessEntryProps) => {
  return (
    <div className={styles.formSection}>
      <div className={styles.entryHeader}>
        <h3 className={styles.sectionTitle}>{label}</h3>
        <div className={styles.actions}>
          <IconButton
            icon={Pencil}
            aria-label="Edit"
            title="Edit"
            onClick={onEdit}
          />
          <IconButton
            icon={Trash2}
            aria-label="Delete"
            title="Delete"
            onClick={onDelete}
          />
        </div>
      </div>
      <div className={styles.formLayout}>
        <div className={styles.rowThreeCols}>
          <CompanyEmployerName
            value={data.companyEmployerName}
            onChange={noop}
            required
            disabled
          />
          <OwnerLease value={data.ownerLease} onChange={noop} disabled />
          <TIN value={data.tin} onChange={noop} required disabled />
        </div>
        <div className={styles.rowTwoCols}>
          <UpdatedDateTime
            value={data.updatedDateTime}
            onChange={noop}
            disabled
          />
          <OccupiedSince value={data.occupiedSince} onChange={noop} disabled />
        </div>
        <div className={styles.rowAddressContact}>
          <div className={styles.addressColumn}>
            <PrimaryAddress
              value={data.primaryAddress}
              onChange={noop}
              required
              disabled
            />
            <SecondaryAddress
              value={data.secondaryAddress}
              onChange={noop}
              disabled
            />
          </div>
          <div className={styles.contactColumn}>
            <PrimaryContact
              value={data.primaryContact}
              onChange={noop}
              required
              disabled
            />
            <SecondaryContact
              value={data.secondaryContact}
              onChange={noop}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessEntry;
