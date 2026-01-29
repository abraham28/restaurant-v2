import React from 'react';
import Checkbox from 'atomic-components/Checkbox/Checkbox';
import styles from './ClientType.module.scss';
import { ClientTypeProps } from './types';

function ClientType({ selectedTypes, onChange }: ClientTypeProps) {
  return (
    <div className={styles.container}>
      <div className={styles.checkboxGroup}>
        <Checkbox
          checked={selectedTypes.individual}
          onChange={(checked) => onChange('individual', checked)}
          label="Individual"
          id="client-type-individual"
        />
        <Checkbox
          checked={selectedTypes.company}
          onChange={(checked) => onChange('company', checked)}
          label="Company"
          id="client-type-company"
        />
        <Checkbox
          checked={selectedTypes.government}
          onChange={(checked) => onChange('government', checked)}
          label="Government"
          id="client-type-government"
        />
        <Checkbox
          checked={selectedTypes.organization}
          onChange={(checked) => onChange('organization', checked)}
          label="Organization"
          id="client-type-organization"
        />
      </div>
    </div>
  );
}

export default ClientType;
