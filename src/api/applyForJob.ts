import {
  database,
  jobApplicationsCollection,
  jobsCollection,
} from "../firebaseConfig";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { JobApplicationFormValues } from "../types/JobAppFormValues";
import { User } from "firebase/auth";

/**
 * submits job app user input data.
 * if the user is authenticated, it also updates the job document with the applicant's email (used to display to the user a message that they've already applied for this job in the jobDetails component).
 *
 * @param {Object} applyFormValues - form values containing applicant's name, email, and cover letter.
 * @param {String[]} applicantFileURLs - array of urls of the applicant's uploaded files in Firebase Storage.
 * @param {Object|null} authenticatedUser - defaults to null if no auth.
 * @param {String} jobId
 * @returns {Promise<void>} resolves when the application has been processed.
 */

export async function applyForJob(
  applyFormValues: JobApplicationFormValues,
  applicantFileURLs: string[],
  authenticatedUser: User | null,
  jobId: string
) {
  const { firstAndLastName, email, coverLetter } = applyFormValues;

  const jobApplicationData = {
    job_id: jobId,
    applicant_user_id: authenticatedUser?.uid || "n/a",
    applicant_name: firstAndLastName,
    applicant_email: email,
    applicant_coverletter: coverLetter,
    applicant_fileURLs: applicantFileURLs,
  };

  const databaseCollection = collection(database, jobApplicationsCollection);
  const applyingForJobDocumentRef = doc(database, jobsCollection, jobId);

  if (jobApplicationData.applicant_user_id !== "n/a") {
    const addJobApplicationsPromise = addDoc(
      databaseCollection,
      jobApplicationData
    );
    const updateJobPromise = updateDoc(applyingForJobDocumentRef, {
      applicantEmails: arrayUnion(authenticatedUser?.email),
    });

    await Promise.all([addJobApplicationsPromise, updateJobPromise]);
  } else {
    await addDoc(databaseCollection, jobApplicationData);
  }
}
