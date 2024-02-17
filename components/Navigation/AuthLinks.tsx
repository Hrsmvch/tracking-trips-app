'use client'
import { UserAuth } from "@/context/AuthContext";
import styles from "./styles.module.scss";
import Loading from "../Loader/Loading";

const AuthLinks: React.FC = () => {

  const { user, loading, googleSignIn, logOut } = UserAuth()  
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
    <ul className={styles.menu}>
      {loading ? (<Loading />) : (
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
  );
};

export default AuthLinks;