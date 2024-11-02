import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/**
 * authenticates a user using firebase authentication with email and password.
 *
 * @async
 * @function loginUser
 * @param {Object} loginFormValues - user input login form values object.
 * @returns {Promise<user>} - promise that resolves to the authenticated user object.
 */

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
