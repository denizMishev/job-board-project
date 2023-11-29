import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { useAuth } from "../../context/AuthContext";

import { database } from "../../firebaseConfig";

import { addDoc, collection } from "firebase/firestore";
import { FileUploader } from "./FileUploader";

export function JobApplyModal({
  onClose,
  show,
  positionName,
  showSuccessAnnouncement,
}) {
  const { currentUser } = useAuth();
  const { jobId } = useParams();

  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [applyFormValues, setApplyFormValues] = useState({
    applyingForJobID: jobId,
    applicantUserId: "",
    firstAndLastName: "",
    email: "",
    coverLetter: "",
    filesURLs: [],
  });

  useEffect(() => {
    setApplyFormValues((prevValues) => ({
      ...prevValues,
      applicantUserId: currentUser?.uid || "n/a",
      firstAndLastName: currentUser?.displayName || "",
      email: currentUser?.email || "",
      filesURLs: uploadingFiles.map((file) => file.fileURL),
    }));
  }, [currentUser, uploadingFiles]);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const target = e.target.name;

    setApplyFormValues((state) => ({
      ...state,
      [target]: value,
    }));
  };

  const jobApplicationsCollection = collection(database, "job_applications");

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      applicantUserId,
      applyingForJobID,
      firstAndLastName,
      email,
      coverLetter,
      filesURLs,
    } = applyFormValues;

    const jobApplicationData = {
      job_id: applyingForJobID,
      applicant_user_id: applicantUserId,
      applicant_name: firstAndLastName,
      applicant_email: email,
      applicant_coverletter: coverLetter,
      applicant_fileURLs: filesURLs,
    };

    return addDoc(jobApplicationsCollection, jobApplicationData)
      .then(() => {
        console.log("application submitted successfully");
        onClose();
        showSuccessAnnouncement();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!show) {
    return null;
  }

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
            <form onSubmit={handleSubmit} className="form">
              <div className="form-input-container color-primary-switch-100-light">
                <label className="form-field-label" htmlFor="">
                  First and family name
                </label>
                <input
                  className="bg-neutral-100 color-primary-switch-100"
                  name="firstAndLastName"
                  type="text"
                  value={applyFormValues.firstAndLastName}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-input-container color-primary-switch-100-light">
                <label className="form-field-label" htmlFor="">
                  E-mail
                </label>
                <input
                  className="bg-neutral-100 color-primary-switch-100"
                  name="email"
                  type="text"
                  value={applyFormValues.email}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="job-apply-form-letter-container | form-input-container color-primary-switch-100-light">
                <label className="form-field-label" htmlFor="">
                  Cover letter
                </label>
                <textarea
                  className="job-apply-form-textarea | bg-neutral-100 color-primary-switch-100"
                  name="coverLetter"
                  cols="20"
                  rows="5"
                  value={applyFormValues.coverLetter}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
              <FileUploader sendUploadFiles={setUploadingFiles}></FileUploader>

              <button
                className="job-apply-form-submit-button | form-submit-button button"
                type="submit"
              >
                Submit application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
