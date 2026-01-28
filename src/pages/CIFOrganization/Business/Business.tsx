import React from 'react';
import { FileText, Phone } from 'lucide-react';
import AutocompleteInput from 'atomic-components/AutocompleteInput';
import TextInput from 'atomic-components/TextInput/TextInput';
import RequiredFieldBullet from 'atomic-components/RequiredFieldBullet/RequiredFieldBullet';
import styles from '../CIFOrganization.module.scss';

interface FormData {
  businessName: string;
  businessActivity: string;
  businessMainAddress: string;
  businessAdditionalAddress: string;
  businessID1: string;
  businessID2: string;
  businessPrimaryContact: string;
  businessSecondaryContact: string;
  otherBusinessName: string;
  otherBusinessActivity: string;
  otherBusinessMainAddress: string;
  otherBusinessAdditionalAddress: string;
  otherBusinessID1: string;
  otherBusinessID2: string;
  otherBusinessPrimaryContact: string;
  otherBusinessSecondaryContact: string;
}

interface BusinessTabProps {
  formData: FormData;
  onInputChange: (
    field: keyof FormData,
    value: string | number | boolean,
  ) => void;
}

function BusinessTab({ formData, onInputChange }: BusinessTabProps) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.businessGrid}>
        {/* BUSINESS INFORMATION Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>BUSINESS INFORMATION</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Business Name</label>
              <TextInput
                value={formData.businessName}
                onChange={(value) => onInputChange('businessName', value)}
                placeholder="Enter business name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Business Activities</label>
              <AutocompleteInput
                value={formData.businessActivity}
                onChange={(value) => onInputChange('businessActivity', value)}
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            {/* Addresses Section */}
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Addresses</h4>
              <div className={styles.fieldsGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Main <RequiredFieldBullet />{' '}
                    <RequiredFieldBullet type="amla" />
                  </label>
                  <AutocompleteInput
                    value={formData.businessMainAddress}
                    onChange={(value) =>
                      onInputChange('businessMainAddress', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter address"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Additional <RequiredFieldBullet />{' '}
                    <RequiredFieldBullet type="amla" />
                  </label>
                  <AutocompleteInput
                    value={formData.businessAdditionalAddress}
                    onChange={(value) =>
                      onInputChange('businessAdditionalAddress', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter address"
                  />
                </div>
              </div>
            </div>

            {/* Business ID Section */}
            <div className={styles.subsection}>
              <div className={styles.subsectionHeader}>
                <div className={styles.sectionTitleWithIcon}>
                  <FileText size={16} className={styles.sectionIcon} />
                  <h4 className={styles.subsectionTitle}>Business ID</h4>
                </div>
                <span className={styles.subsectionLabel}>Identification</span>
              </div>
              <div className={styles.fieldsGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    ID 1 <RequiredFieldBullet />
                  </label>
                  <AutocompleteInput
                    value={formData.businessID1}
                    onChange={(value) => onInputChange('businessID1', value)}
                    suggestions={[]}
                    placeholder="Select or enter ID"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>ID 2</label>
                  <AutocompleteInput
                    value={formData.businessID2}
                    onChange={(value) => onInputChange('businessID2', value)}
                    suggestions={[]}
                    placeholder="Select or enter ID"
                  />
                </div>
              </div>
            </div>

            {/* Contacts Section */}
            <div className={styles.subsection}>
              <div className={styles.subsectionHeader}>
                <div className={styles.sectionTitleWithIcon}>
                  <Phone size={16} className={styles.sectionIcon} />
                  <h4 className={styles.subsectionTitle}>Contacts</h4>
                </div>
                <span className={styles.subsectionLabel}>Contact List</span>
              </div>
              <div className={styles.fieldsGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Primary <RequiredFieldBullet />
                  </label>
                  <AutocompleteInput
                    value={formData.businessPrimaryContact}
                    onChange={(value) =>
                      onInputChange('businessPrimaryContact', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter contact"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Secondary</label>
                  <AutocompleteInput
                    value={formData.businessSecondaryContact}
                    onChange={(value) =>
                      onInputChange('businessSecondaryContact', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter contact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Business Information Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Other Business Information</h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Business Name</label>
              <TextInput
                value={formData.otherBusinessName}
                onChange={(value) => onInputChange('otherBusinessName', value)}
                placeholder="Enter business name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Business Activities</label>
              <AutocompleteInput
                value={formData.otherBusinessActivity}
                onChange={(value) =>
                  onInputChange('otherBusinessActivity', value)
                }
                suggestions={[]}
                placeholder="Type to Search."
              />
            </div>

            {/* Addresses Section */}
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Addresses</h4>
              <div className={styles.fieldsGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Main <RequiredFieldBullet />{' '}
                    <RequiredFieldBullet type="amla" />
                  </label>
                  <AutocompleteInput
                    value={formData.otherBusinessMainAddress}
                    onChange={(value) =>
                      onInputChange('otherBusinessMainAddress', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter address"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Additional <RequiredFieldBullet />{' '}
                    <RequiredFieldBullet type="amla" />
                  </label>
                  <AutocompleteInput
                    value={formData.otherBusinessAdditionalAddress}
                    onChange={(value) =>
                      onInputChange('otherBusinessAdditionalAddress', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter address"
                  />
                </div>
              </div>
            </div>

            {/* Business ID Section */}
            <div className={styles.subsection}>
              <div className={styles.subsectionHeader}>
                <div className={styles.sectionTitleWithIcon}>
                  <FileText size={16} className={styles.sectionIcon} />
                  <h4 className={styles.subsectionTitle}>Business ID</h4>
                </div>
                <span className={styles.subsectionLabel}>Identification</span>
              </div>
              <div className={styles.fieldsGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    ID 1 <RequiredFieldBullet />
                  </label>
                  <AutocompleteInput
                    value={formData.otherBusinessID1}
                    onChange={(value) =>
                      onInputChange('otherBusinessID1', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter ID"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>ID 2</label>
                  <AutocompleteInput
                    value={formData.otherBusinessID2}
                    onChange={(value) =>
                      onInputChange('otherBusinessID2', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter ID"
                  />
                </div>
              </div>
            </div>

            {/* Contacts Section */}
            <div className={styles.subsection}>
              <div className={styles.subsectionHeader}>
                <div className={styles.sectionTitleWithIcon}>
                  <Phone size={16} className={styles.sectionIcon} />
                  <h4 className={styles.subsectionTitle}>Contacts</h4>
                </div>
                <span className={styles.subsectionLabel}>Contact List</span>
              </div>
              <div className={styles.fieldsGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Primary <RequiredFieldBullet />
                  </label>
                  <AutocompleteInput
                    value={formData.otherBusinessPrimaryContact}
                    onChange={(value) =>
                      onInputChange('otherBusinessPrimaryContact', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter contact"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Secondary</label>
                  <AutocompleteInput
                    value={formData.otherBusinessSecondaryContact}
                    onChange={(value) =>
                      onInputChange('otherBusinessSecondaryContact', value)
                    }
                    suggestions={[]}
                    placeholder="Select or enter contact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessTab;
