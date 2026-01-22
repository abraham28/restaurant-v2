import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'atomic-components/Button';
import { ROUTES } from 'utils/constants';
import styles from './ClientInformationSystem.module.scss';

function ClientInformationSystem() {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate(ROUTES.CLIENT_INFORMATION_SYSTEM.INSERT);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Client Information System</h1>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.helloWorld}>Hello World</div>
      </div>
    </div>
  );
}

export default ClientInformationSystem;
