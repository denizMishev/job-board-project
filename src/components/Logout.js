import React from "react";

import { getAuth, signOut } from "firebase/auth";

export function Logout() {
  const handleLogout = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      signOut(auth)
        .then(() => {
          console.log("User signed out successfully");
        })
        .catch((error) => {
          console.error("Error signing out:", error.message);
        });
    } else {
      console.log("No user is currently logged in");
    }
  };

  return <span onClick={handleLogout}>Logout</span>;
}
