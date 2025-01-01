import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginFormValues } from "../types/LoginFormValues";

export async function loginUser(loginFormValues: LoginFormValues) {
  const auth = getAuth();
  const { email, password } = loginFormValues;

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
}
