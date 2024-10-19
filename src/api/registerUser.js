import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { database, usersCollection } from "../firebaseConfig";

export async function registerUser(registerFormValues) {
  const auth = getAuth();
  const databaseCollection = collection(database, usersCollection);

  const { email, password, firstName, lastName } = registerFormValues;

  if (firstName === "" || lastName === "")
    throw new Error("First name and last name cannot be empty");

  try {
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
  } catch (error) {
    throw error;
  }
}
