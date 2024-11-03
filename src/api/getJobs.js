import { getDocs, query, where, collection } from "@firebase/firestore";
import { database, jobsCollection } from "../firebaseConfig";

/**
 * fetch jobs from firestore with an optional filter using the firestore where() method.
 * @param {Object} filter param object for firestore where() method.
 * @param {String} filter.field field value
 * @param {String} filter.operator operation string (e.g "<", "<=", "==", "<", "<=", "!=")
 * @param {String} filter.value value for comparison
 * @returns {Promise<Array>} promise that resolves to an array of job objects with IDs extracted from their firebase doc ID.
 */

export async function getJobs(filter = null) {
  const databaseCollection = collection(database, jobsCollection);

  let jobsQuery;

  if (filter && filter.field && filter.operator && filter.value !== undefined) {
    jobsQuery = query(
      databaseCollection,
      where(filter.field, filter.operator, filter.value)
    );
  } else jobsQuery = databaseCollection;

  const response = await getDocs(jobsQuery);
  const jobs = response.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return jobs;
}
