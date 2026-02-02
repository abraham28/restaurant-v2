import React from 'react';
import { RefreshCw } from 'lucide-react';
import Button from 'atomic-components/Button';
import styles from './RefreshButton.module.scss';
import { RefreshButtonProps } from './types';

function RefreshButton({
  onClick,
  loading = false,
  disabled = false,
}: RefreshButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      disabled={disabled || loading}
      className={styles.refreshButton}
    >
      <RefreshCw
        size={18}
        className={loading ? styles.spinning : ''}
        style={{ marginRight: '0.5rem' }}
      />
      Refresh
    </Button>
  );
}

export default RefreshButton;
