import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(loginFormValues) {
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
