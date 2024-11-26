import { getDoc, doc } from "@firebase/firestore";
import { database, jobsCollection } from "../firebaseConfig";

import { JobProps } from "../types/JobProps";

/**
 * fetch a job document by id from firestore.
 * @param {String} jobId - the id of the job document to fetch.
 * @returns {Promise<Object>} promise that resolves to the job data object or null if it fails to fetch.
 */
export async function getJob(jobId: string): Promise<JobProps | null> {
  const docRef = doc(database, jobsCollection, jobId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as JobProps;
  } else {
    console.error(`job document with ID ${jobId} does not exist.`);
    return null;
  }
}
