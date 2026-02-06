import React from 'react';
import styles from './BasicInformation.module.scss';
import DateofBirth from './DateofBirth';
import EmailAddress from './EmailAddress';
import FirstName from './FirstName/FirstName';
import Gender from './Gender';
import LastName from './LastName/LastName';
import MiddleName from './MiddleName/MiddleName';
import PhoneNumber from './PhoneNumber';
import Suffix from './Suffix/Suffix';
import Title from './Title/Title';
import Status from './Status';
import { WorkSection } from './Work';

const BasicInformation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formCardTop}>
          <div className={styles.headerContainer}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>
            <p className={styles.sectionSubtitle}>
              Customer's core identification and contact details.
            </p>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.nameGrid}>
              <Title />
              <LastName />
              <FirstName />
              <MiddleName />
              <Suffix />
            </div>
          </div>
        </div>
        <div className={styles.formCardMiddle}>
          <div className={styles.twoColumnGrid}>
            <DateofBirth />
            <PhoneNumber />
            <EmailAddress />
            <div className={styles.smallFieldsRow}>
              <Gender />
              <Status />
            </div>
          </div>
        </div>
        <WorkSection />
      </div>
    </div>
  );
};

export default BasicInformation;
