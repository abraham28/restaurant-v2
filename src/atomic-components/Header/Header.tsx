import React from 'react';
import styles from './Header.module.scss';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <header className={`${styles.header} ${className}`} {...props}>
      {children}
    </header>
  );
};

export default Header;
