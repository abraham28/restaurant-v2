import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Link.module.scss';
import { LinkProps } from './types';

const Link: React.FC<LinkProps> = ({
  children,
  underline = false,
  className = '',
  ...props
}) => {
  const linkClasses = [styles.link, underline && styles.underline, className]
    .filter(Boolean)
    .join(' ');

  return (
    <RouterLink className={linkClasses} {...props}>
      {children}
    </RouterLink>
  );
};

export default Link;
