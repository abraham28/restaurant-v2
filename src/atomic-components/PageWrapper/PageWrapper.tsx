import React from 'react';
import styles from './PageWrapper.module.scss';
import { PageWrapperProps } from './types';

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = '',
}) => {
  return <div className={`${styles.pageWrapper} ${className}`}>{children}</div>;
};

export default PageWrapper;
