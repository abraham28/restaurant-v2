import React from 'react';
import styles from './ContentWrapper.module.scss';
import { ContentWrapperProps } from './types';

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`${styles.contentWrapper} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default ContentWrapper;
