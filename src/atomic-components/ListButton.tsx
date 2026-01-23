import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './ListButton.module.scss';

export interface ListButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
}

const ListButton: React.FC<ListButtonProps> = ({
  icon: Icon,
  label,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`${styles.listButton} ${className}`}
      {...props}
    >
      <Icon size={16} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default ListButton;
