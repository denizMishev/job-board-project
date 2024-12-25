import { useState } from "react";
import { useParams } from "react-router";

import { useAuth } from "../../context/AuthContext";

import { applyForJob } from "../../api/applyForJob";

import { authErrorMessages } from "../../utils/errorMessages";
import { useErrorBoundary } from "react-error-boundary";

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

  const [applicantFileURLs, setApplicantFileURLs] = useState([]);

  const handleSubmit = async (applyFormValues) => {
    try {
      await applyForJob(
        applyFormValues,
        applicantFileURLs,
        authenticatedUser,
        jobId
      );
      onClose();
      showSuccessAnnouncement();
    } catch (error) {
      showBoundary(error);
    }
  };

  if (!show) return null;

  const inputFields = [
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
  ];

  const textareaFields = [
    {
      name: "coverLetter",
      label: "Cover letter",
      type: "textarea",
      required: false,
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
            <Form
              inputFields={inputFields}
              textareaFields={textareaFields}
              handleSubmit={handleSubmit}
            >
              <FileUploader setApplicantFileURLs={setApplicantFileURLs} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
