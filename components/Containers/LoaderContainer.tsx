import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface LoaderContainerProps {
  children: ReactNode;
}

const LoaderContainer: React.FC<LoaderContainerProps> = ({ children }) => {
  return (
    <>
      <div className={styles.loading_container}>{children}</div>
    </>
  );
};

export default LoaderContainer;
