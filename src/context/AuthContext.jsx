import React, { createContext, useContext, useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";

// const auth = getAuth();
import { auth } from "../firebaseConfig";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    authenticatedUser: currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
