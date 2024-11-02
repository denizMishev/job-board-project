import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { database, usersCollection } from "../firebaseConfig";

/**
 * registers a user using firebase authentication and stores user data in firestore, all fields are required values, an updateProfile call will also be made to set up the user's display name value
 *
 * @async
 * @function registerUser
 * @param {Object} registerFormValues - user input register form values object.
 * @returns {Promise<user>} promise that resolves to the firebase authentication user object.
 * @throws {Error} throws error if first or last name value is empty, this must be manually handled in this func as firebase authentication does not require it.
 */

export async function registerUser(registerFormValues) {
  const auth = getAuth();
  const databaseCollection = collection(database, usersCollection);

  const { email, password, firstName, lastName } = registerFormValues;

  if (firstName === "" || lastName === "")
    throw new Error("First name and last name cannot be empty");

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: `${firstName} ${lastName}`,
  });

  const userData = {
    email: email,
    first_name: firstName,
    last_name: lastName,
    saved_jobs: [],
    jobs_applied_for: [],
  };

  await addDoc(databaseCollection, userData);

  return user;
}
