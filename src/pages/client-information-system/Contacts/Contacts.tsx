import React from 'react';
import { Grid3x3, CreditCard, Phone, User } from 'lucide-react';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import TextInput from 'atomic-components/TextInput/TextInput';
import Radio from 'atomic-components/Radio/Radio';
import NumberInput from 'atomic-components/NumberInput/NumberInput';
import RequiredFieldBullet from 'atomic-components/RequiredFieldBullet/RequiredFieldBullet';
import ListButton from 'atomic-components/ListButton/ListButton';
import Button from 'atomic-components/Button/Button';
import styles from '../ClientInformationSystemInsert.module.scss';

interface FormData {
  address1Used: string;
  address2Used: string;
  primaryID1: string;
  primaryID2: string;
  primaryID3: string;
  secondaryID1: string;
  secondaryID2: string;
  secondaryID3: string;
  primaryContact: string;
  secondaryContact: string;
  presentedIDType: string;
  idNoPresentedForAMLA: string;
  countryCode: string;
  mobileNumber: string;
  emailAddress: string;
}

interface ContactsTabProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: string | number | boolean,
  ) => void;
  onOpenModal: (title: string) => void;
  idTypeOptions: string[];
  countryCodeOptions: string[];
}

function ContactsTab({
  formData,
  onInputChange,
  onOpenModal,
  idTypeOptions,
  countryCodeOptions,
}: ContactsTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.formGrid}>
        {/* Addresses Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Addresses</h3>
            <ListButton
              icon={Grid3x3}
              label="Address List"
              onClick={() => onOpenModal('Address List')}
              aria-label="Open Address List"
            />
          </div>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                Primary <RequiredFieldBullet />{' '}
                <RequiredFieldBullet type="amla" />
              </label>
              <AutocompleteInput
                value={formData.address1Used}
                onChange={(value) => onInputChange('address1Used', value)}
                suggestions={[]}
                placeholder="Select or enter primary address"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                Secondary <RequiredFieldBullet />{' '}
                <RequiredFieldBullet type="amla" />
              </label>
              <AutocompleteInput
                value={formData.address2Used}
                onChange={(value) => onInputChange('address2Used', value)}
                suggestions={[]}
                placeholder="Select or enter secondary address"
              />
            </div>
          </div>
        </div>

        {/* Primary ID Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWithIcon}>
              <CreditCard size={16} className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>Primary ID</h3>
            </div>
            <ListButton
              icon={Grid3x3}
              label="Primary ID List"
              onClick={() => onOpenModal('Primary ID List')}
              aria-label="Open Primary ID List"
            />
          </div>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                ID 1: <RequiredFieldBullet />
              </label>
              <Radio
                value={formData.primaryID1}
                onChange={(value) => onInputChange('primaryID1', value)}
                options={idTypeOptions}
                placeholder="Select ID 1"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>ID 2:</label>
              <Radio
                value={formData.primaryID2}
                onChange={(value) => onInputChange('primaryID2', value)}
                options={idTypeOptions}
                placeholder="Select ID 2"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>ID 3:</label>
              <Radio
                value={formData.primaryID3}
                onChange={(value) => onInputChange('primaryID3', value)}
                options={idTypeOptions}
                placeholder="Select ID 3"
              />
            </div>
          </div>
        </div>

        {/* Secondary ID Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWithIcon}>
              <CreditCard size={16} className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>Secondary ID</h3>
            </div>
            <ListButton
              icon={Grid3x3}
              label="Secondary ID List"
              onClick={() => onOpenModal('Secondary ID List')}
              aria-label="Open Secondary ID List"
            />
          </div>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                ID 1: <RequiredFieldBullet />
              </label>
              <Radio
                value={formData.secondaryID1}
                onChange={(value) => onInputChange('secondaryID1', value)}
                options={idTypeOptions}
                placeholder="Select or enter ID 1"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>ID 2:</label>
              <Radio
                value={formData.secondaryID2}
                onChange={(value) => onInputChange('secondaryID2', value)}
                options={idTypeOptions}
                placeholder="Select or enter ID 2"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>ID 3:</label>
              <Radio
                value={formData.secondaryID3}
                onChange={(value) => onInputChange('secondaryID3', value)}
                options={idTypeOptions}
                placeholder="Select or enter ID 3"
              />
            </div>
          </div>
        </div>

        {/* Contacts Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWithIcon}>
              <Phone size={16} className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>Contacts</h3>
            </div>
            <ListButton
              icon={Grid3x3}
              label="Contact List"
              onClick={() => onOpenModal('Contact List')}
              aria-label="Open Contact List"
            />
          </div>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                Primary: <RequiredFieldBullet />
              </label>
              <Radio
                value={formData.primaryContact}
                onChange={(value) => onInputChange('primaryContact', value)}
                options={idTypeOptions}
                placeholder="Select or enter primary contact"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Secondary:</label>
              <Radio
                value={formData.secondaryContact}
                onChange={(value) => onInputChange('secondaryContact', value)}
                options={idTypeOptions}
                placeholder="Select or enter secondary contact"
              />
            </div>
          </div>
        </div>

        {/* For AMLA Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>For AMLA</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                Presented ID Type: <RequiredFieldBullet type="amla" />
              </label>
              <Radio
                value={formData.presentedIDType}
                onChange={(value) => onInputChange('presentedIDType', value)}
                options={idTypeOptions}
                placeholder="Select presented ID type"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                ID No. Presented for AMLA: <RequiredFieldBullet type="amla" />
              </label>
              <TextInput
                value={formData.idNoPresentedForAMLA}
                onChange={(value) =>
                  onInputChange('idNoPresentedForAMLA', value)
                }
                placeholder="Enter ID number"
              />
            </div>
          </div>
        </div>

        {/* Mobile Banking Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Mobile Banking</h3>
            <Button
              variant="primary"
              className={styles.activateButton}
              onClick={() => {
                // TODO: Implement mobile banking activation
                console.log('Activate Mobile Banking clicked');
              }}
            >
              <User size={16} />
              ACTIVATE
            </Button>
          </div>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Mobile Number:</label>
              <div className={styles.mobileNumberWrapper}>
                <div className={styles.countryCodeWrapper}>
                  <Radio
                    value={formData.countryCode}
                    onChange={(value) => onInputChange('countryCode', value)}
                    options={countryCodeOptions}
                    placeholder="+63"
                  />
                </div>
                <NumberInput
                  decimal={false}
                  value={
                    formData.mobileNumber
                      ? Number(formData.mobileNumber)
                      : undefined
                  }
                  onChange={(value) => onInputChange('mobileNumber', value)}
                  placeholder="Enter mobile number"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email Address:</label>
              <TextInput
                value={formData.emailAddress}
                onChange={(value) => onInputChange('emailAddress', value)}
                placeholder="Enter email address"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactsTab;
