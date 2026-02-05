import styles from './BasicInformation.module.scss';
import FirstName from './FirstName/FirstName';
import LastName from './LastName/LastName';
import MiddleName from './MiddleName/MiddleName';
import Suffix from './Suffix/Suffix';
import Title from './Title/Title';

const BasicInformation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formCard}>
          <div className={styles.headerContainer}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>
            <p className={styles.sectionSubtitle}>
              Customer's core identification and contact details.
            </p>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.nameGrid}>
              <Title />
              <FirstName />
              <MiddleName />
              <LastName />
              <Suffix />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
