import React from 'react';
import Checkbox from 'atomic-components/Checkbox';
import Textarea from 'atomic-components/Textarea';
import styles from '../ClientInformationSystemInsert.module.scss';

interface FormData {
  insufficientInformation: boolean;
  insufficientInformationRemarks: string;
  insufficientDocuments: boolean;
  insufficientDocumentsRemarks: string;
}

interface DocumentsTabProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: string | number | boolean,
  ) => void;
}

function DocumentsTab({ formData, onInputChange }: DocumentsTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.documentsContainer}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Documents</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <Checkbox
                checked={formData.insufficientInformation}
                onChange={(checked) =>
                  onInputChange('insufficientInformation', checked)
                }
                label="Insufficient Information"
              />
              <div className={styles.textareaWrapper}>
                <Textarea
                  value={formData.insufficientInformationRemarks}
                  onChange={(value) =>
                    onInputChange('insufficientInformationRemarks', value)
                  }
                  placeholder="Type in your remarks(optional)"
                  rows={6}
                />
              </div>
            </div>
            <div className={styles.field}>
              <Checkbox
                checked={formData.insufficientDocuments}
                onChange={(checked) =>
                  onInputChange('insufficientDocuments', checked)
                }
                label="Insufficient Documents"
              />
              <div className={styles.textareaWrapper}>
                <Textarea
                  value={formData.insufficientDocumentsRemarks}
                  onChange={(value) =>
                    onInputChange('insufficientDocumentsRemarks', value)
                  }
                  placeholder="Type in your remarks(optional)"
                  rows={6}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentsTab;
