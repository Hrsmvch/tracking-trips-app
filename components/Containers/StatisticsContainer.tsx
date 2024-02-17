import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

interface StatisticsContainerProps {
  children: ReactNode;
}

const StatisticsContainer: React.FC<StatisticsContainerProps> = ({ children }) => {
  return (
    <div className={styles.statistics_container}>
      {children}
    </div>
  );
};

export default StatisticsContainer;
