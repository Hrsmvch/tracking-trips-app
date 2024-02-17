import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

interface NavigationContainerProps {
  children: ReactNode;
}

const NavigationContainer: React.FC<NavigationContainerProps> = ({ children }) => {
  return (
    <nav className={styles.nav_container}>
      {children}
    </nav>
  );
};

export default NavigationContainer;
