import { getAuth, signOut } from "firebase/auth";

export function logoutUser() {
  const auth = getAuth();
  return signOut(auth);
}
