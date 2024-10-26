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

export async function applyForJob(
  applyFormValues,
  applicantFileURLs,
  authenticatedUser,
  jobId
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
      applicantEmails: arrayUnion(authenticatedUser.email),
    });

    await Promise.all([addJobApplicationsPromise, updateJobPromise]);
  } else {
    await addDoc(databaseCollection, jobApplicationData);
  }
}
