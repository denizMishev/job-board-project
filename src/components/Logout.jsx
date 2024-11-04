import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import { getAuth } from "firebase/auth";

import { logoutUser } from "../api/logoutUser";

export function Logout() {
  const { showBoundary } = useErrorBoundary([]);

  const handleLogout = async () => {
    const auth = getAuth();

    if (auth.currentUser) {
      try {
        await logoutUser();
      } catch (error) {
        showBoundary(error);
      }
    } else {
      console.warn("no user logged in.");
    }
  };

  return <span onClick={handleLogout}>Logout</span>;
}
