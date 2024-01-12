import { UserAuth } from "@/context/AuthContext";
import styles from "./styles.module.scss";
import HandDrawnArrow from "@/public/hand-drawn-arrow.svg";

export default function UnAuth() {
  const { googleSignIn } = UserAuth(); 

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <main className={styles.unAuthBlock}>
      <div className={styles.message}>
        Please <span>Sign In</span> to start tracking your trips
        <HandDrawnArrow />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </main>
  );
}
