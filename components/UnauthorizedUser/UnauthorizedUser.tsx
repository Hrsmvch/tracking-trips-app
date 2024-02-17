import React from 'react'
import styles from './styles.module.scss';
import HandDrawnArrow from "@/public/hand-drawn-arrow.svg";
import { UserAuth } from '@/context/AuthContext';

export default function UnauthorizedUser() {
  const { googleSignIn } = UserAuth(); 

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  
  return (
    <div className={styles.unauthorized}>
       <div className={styles.message}>
        Please <span>Sign In</span> to start tracking your trips
        <HandDrawnArrow />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  )
}
