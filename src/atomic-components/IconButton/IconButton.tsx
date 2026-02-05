import React from 'react';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './types';

function IconButton({
  icon: Icon,
  size = 18,
  'aria-label': ariaLabel,
  title,
  className = '',
  ...props
}: IconButtonProps) {
  const buttonClasses = [styles.iconButton, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      aria-label={ariaLabel}
      title={title ?? ariaLabel}
      {...props}
    >
      <Icon size={size} />
    </button>
  );
}

export default IconButton;
