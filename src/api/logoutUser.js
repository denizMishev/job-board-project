import { getAuth, signOut } from "firebase/auth";

/**
 * sign out the current user.
 * @returns {Promise<void>} promise that resolves when the user is signed out.
 */

export function logoutUser() {
  const auth = getAuth();
  return signOut(auth);
}
