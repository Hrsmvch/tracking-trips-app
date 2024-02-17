"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import Loading from "@/components/Loader/Loading";

const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const auth = getAuth();
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }
      await user.getIdToken();

      setUser(user);
      setLoading(false);
    });
  }), [];

  return (
    <AuthContext.Provider value={{ user, loading, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
