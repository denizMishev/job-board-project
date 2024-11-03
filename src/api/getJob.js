import { getDoc, doc } from "@firebase/firestore";
import { database, jobsCollection } from "../firebaseConfig";

/**
 * fetch a job document by id from firestore.
 * @param {String} jobId - the id of the job document to fetch.
 * @returns {Promise<Object>} promise that resolves to the job data object.
 */
export async function getJob(jobId) {
  const docRef = doc(database, jobsCollection, jobId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
