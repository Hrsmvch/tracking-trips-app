"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();

  const { user, loading, googleSignIn, logOut } = UserAuth(); 
 
  const handleSignIn = async () => {
    try {
      await googleSignIn(); 
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${
            pathname == "/" ? styles.current : ""
          }`}
        >
          <Link href={"/"}>My Trips</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            pathname == "/statistics" ? styles.current : ""
          }`}
        >
          <Link href={"/statistics"}>Statistics</Link>
        </li>
      </ul>
      <ul className={styles.menu}>
        {loading ? null : (
          <>
            {!user ? (
              <li className={styles.menuItem} onClick={handleSignIn}>
                Sign In
              </li>
            ) : (
              <li className={styles.menuItem} onClick={handleLogOut}>
                Sign Out
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}
function addTripForCurrentUser() {
  throw new Error("Function not implemented.");
}

