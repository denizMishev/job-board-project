import React from "react";

import { getAuth, signOut } from "firebase/auth";

import { useErrorBoundary } from "react-error-boundary";

export function Logout() {
  const { showBoundary } = useErrorBoundary([]);

  const handleLogout = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      signOut(auth)
        .then(() => {
          console.log("User signed out successfully");
        })
        .catch((error) => {
          showBoundary(error);
        });
    } else {
      console.log("No user is currently logged in");
    }
  };

  return <span onClick={handleLogout}>Logout</span>;
}
