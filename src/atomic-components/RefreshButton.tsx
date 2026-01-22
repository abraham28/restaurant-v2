import React from 'react';
import { RefreshCw } from 'lucide-react';
import Button from './Button';
import styles from './RefreshButton.module.scss';

interface RefreshButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

function RefreshButton({
  onClick,
  loading = false,
  disabled = false,
}: RefreshButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
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
