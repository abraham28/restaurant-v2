import React from 'react';
import { Folder } from 'lucide-react';
import TextInput from 'atomic-components/TextInput/TextInput';
import Radio from 'atomic-components/Radio/Radio';
import Checkbox from 'atomic-components/Checkbox/Checkbox';
import DatePicker from 'atomic-components/DatePicker/DatePicker';
import Button from 'atomic-components/Button/Button';
import styles from '../CIFGovernment.module.scss';

interface FormData {
  // Employee Related Account (ERA)
  isBankEmployeeRelated: boolean;
  bankEmployeeName: string;
  relationship: string;
  dosri: string;
  isBankEmployee: boolean;
  employeeType: string;
  // Politically Exposed Person
  isPEP: boolean;
  pepPosition: string;
  pepPlace: string;
  pepTerm: string;
  // Tagging
  isWatchListed: boolean;
  isLinkedAccount: boolean;
  isPayee: boolean;
  relatedParty: string;
  // Risk Assessment
  overallScore: number;
  classification: string;
  customerDueDiligence: string;
}

interface AmlaTabProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: string | number | boolean,
  ) => void;
  onOpenModal: (title: string) => void;
  dosriOptions: string[];
  relatedPartyOptions: string[];
  customerDueDiligenceOptions: string[];
}

function AmlaTab({
  formData,
  onInputChange,
  onOpenModal,
  dosriOptions,
  relatedPartyOptions,
  customerDueDiligenceOptions,
}: AmlaTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.amlaGrid}>
        {/* Employee Related Account (ERA) Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Employee Related Account (ERA)
          </h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isBankEmployeeRelated}
                onChange={(checked) =>
                  onInputChange('isBankEmployeeRelated', checked)
                }
                label="Client is Bank Employee Related?"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Bank Employee Name:</label>
              <div className={styles.inputWithIcons}>
                <TextInput
                  value={formData.bankEmployeeName}
                  onChange={(value) => onInputChange('bankEmployeeName', value)}
                  placeholder="Enter bank employee name"
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconOnly
                  onClick={() => onOpenModal('Bank Employee List')}
                  aria-label="Open bank employee list"
                >
                  <Folder size={14} />
                </Button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Relationship:</label>
              <div className={styles.inputWithIcons}>
                <TextInput
                  value={formData.relationship}
                  onChange={(value) => onInputChange('relationship', value)}
                  placeholder="Enter relationship"
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconOnly
                  onClick={() => onOpenModal('Relationship List')}
                  aria-label="Open relationship list"
                >
                  <Folder size={14} />
                </Button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>DOSRI:</label>
              <Radio
                value={formData.dosri}
                onChange={(value) => onInputChange('dosri', value)}
                options={dosriOptions}
                placeholder="Select DOSRI"
              />
            </div>

            <div className={styles.field}>
              <Checkbox
                checked={formData.isBankEmployee}
                onChange={(checked) => onInputChange('isBankEmployee', checked)}
                label="Client is Bank Employee?"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Employee Type:</label>
              <div className={styles.inputWithIcons}>
                <TextInput
                  value={formData.employeeType}
                  onChange={(value) => onInputChange('employeeType', value)}
                  placeholder="Enter employee type"
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconOnly
                  onClick={() => onOpenModal('Employee Type List')}
                  aria-label="Open employee type list"
                >
                  <Folder size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Politically Exposed Person Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Politically Exposed Person</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isPEP}
                onChange={(checked) => onInputChange('isPEP', checked)}
                label="Client is PEP?"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Position:</label>
              <TextInput
                value={formData.pepPosition}
                onChange={(value) => onInputChange('pepPosition', value)}
                placeholder="Enter position"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Place:</label>
              <TextInput
                value={formData.pepPlace}
                onChange={(value) => onInputChange('pepPlace', value)}
                placeholder="Enter place"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Term:</label>
              <DatePicker
                value={formData.pepTerm}
                onChange={(value) => onInputChange('pepTerm', value)}
                placeholder="Select term"
              />
            </div>
          </div>
        </div>

        {/* Tagging Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Tagging</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.isWatchListed}
                onChange={(checked) => onInputChange('isWatchListed', checked)}
                label="Client is Watch Listed?"
              />
            </div>

            <div className={styles.field}>
              <Checkbox
                checked={formData.isLinkedAccount}
                onChange={(checked) =>
                  onInputChange('isLinkedAccount', checked)
                }
                label="Client is Linked Account?"
              />
            </div>

            <div className={styles.field}>
              <Checkbox
                checked={formData.isPayee}
                onChange={(checked) => onInputChange('isPayee', checked)}
                label="Client is Payee?"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Related Party:</label>
              <Radio
                value={formData.relatedParty}
                onChange={(value) => onInputChange('relatedParty', value)}
                options={relatedPartyOptions}
                placeholder="Select related party"
              />
            </div>
          </div>
        </div>

        {/* Risk Assessment Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Risk Assessment</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Overall Score:</label>
              <input
                type="text"
                value={formData.overallScore || '0'}
                readOnly
                className={styles.readOnlyInput}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Classification:</label>
              <input
                type="text"
                value={formData.classification || 'None'}
                readOnly
                className={styles.readOnlyInput}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Customer Due Diligence:</label>
              <Radio
                value={formData.customerDueDiligence}
                onChange={(value) =>
                  onInputChange('customerDueDiligence', value)
                }
                options={customerDueDiligenceOptions}
                placeholder="Select customer due diligence"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmlaTab;
