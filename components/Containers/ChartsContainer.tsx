'use client'
import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import { UserAuth } from "@/context/AuthContext";
import UnauthorizedUser from "../UnauthorizedUser/UnauthorizedUser";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { user, loading } = UserAuth();

  return (
    <div className={styles.page_container}>
      {loading ? null : <>{!user ? <UnauthorizedUser /> : children}</>}
    </div>
  );
};

export default PageContainer;
