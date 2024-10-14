import { useState } from "react";
import { useParams } from "react-router";

import { useAuth } from "../../context/AuthContext";

import { authErrorMessages } from "../../utils/errorMessages";
import { useErrorBoundary } from "react-error-boundary";

import {
  database,
  jobApplicationsCollection,
  jobsCollection,
} from "../../firebaseConfig";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  regexCoverLetter,
  regexEmail,
  regexFirstAndLastName,
} from "../../utils/errorParameters";

import { FileUploader } from "./FileUploader";
import Form from "../Form";

export function JobApplyModal({
  onClose,
  show,
  positionName,
  showSuccessAnnouncement,
}) {
  const { showBoundary } = useErrorBoundary([]);
  const { authenticatedUser } = useAuth();
  const { jobId } = useParams();

  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleSubmit = async (applyFormValues) => {
    const { firstAndLastName, email, coverLetter } = applyFormValues;
    console.log(applyFormValues, "applyFormValues");

    const filesURLs = uploadingFiles
      .filter((file) => file.fileURL)
      .map((file) => file.fileURL);

    const jobApplicationData = {
      job_id: jobId,
      applicant_user_id: authenticatedUser?.uid || "n/a",
      applicant_name: firstAndLastName,
      applicant_email: email,
      applicant_coverletter: coverLetter,
      applicant_fileURLs: filesURLs,
    };
    console.log(jobApplicationData, "jobApplicationData");

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

      try {
        await Promise.all([addJobApplicationsPromise, updateJobPromise]);
        onClose();
        showSuccessAnnouncement();
        console.log("application submitted successfully");
      } catch (error) {
        showBoundary(error);
      }
    } else {
      try {
        await addDoc(databaseCollection, jobApplicationData);
        console.log("application submitted successfully");
        onClose();
        showSuccessAnnouncement();
      } catch (error_2) {
        showBoundary(error_2);
      }
    }
  };

  if (!show) {
    return null;
  }

  const fields = [
    {
      name: "firstAndLastName",
      label: "First and last name",
      type: "text",
      required: true,
      pattern: regexFirstAndLastName,
      errorMessage: authErrorMessages.names,
      value: authenticatedUser?.displayName || "",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      pattern: regexEmail,
      errorMessage: authErrorMessages.email,
      value: authenticatedUser?.email || "",
    },
    {
      name: "coverLetter",
      label: "Cover letter",
      type: "textarea",
      required: false,
      pattern: regexCoverLetter,
      errorMessage: "",
    },
  ];

  return (
    <div>
      <div onClick={onClose} className="job-apply-form-curtain-modal | modal">
        <div
          onClick={(e) => e.stopPropagation()}
          className="job-apply-container | modal-content"
        >
          <div className="close-button-container" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </div>
          <div className="job-apply-form-container | form-container">
            <header className="job-apply-form-header | form-header">
              <span className="fw-bold fs-250 color-primary-switch-100 display-block">
                Applying for:
              </span>
              <span className="display-block fw-bold fs-350 color-primary-200">
                {positionName}
              </span>
            </header>
            <Form fields={fields} handleSubmit={handleSubmit}>
              <FileUploader sendUploadFiles={setUploadingFiles} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
