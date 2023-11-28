import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { useAuth } from "../Context/AuthContext";

import { database, storage } from "../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export function JobApplyModal({ onClose, show, positionName }) {
  const { currentUser } = useAuth();
  const { jobId } = useParams();

  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [applyFormValues, setApplyFormValues] = useState({
    firstAndLastName: "",
    email: "",
    coverLetter: "",
    filesURLs: [],
  });

  useEffect(() => {
    setApplyFormValues({
      firstAndLastName: currentUser?.displayName || "",
      email: currentUser?.email || "",
      coverLetter: "",
      filesURLs: [],
    });
  }, [currentUser]);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const target = e.target.name;

    setApplyFormValues((state) => ({
      ...state,
      [target]: value,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileUpload = (file) => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const newUploadFile = {
      name: file.name,
      progress: 0,
    };

    setUploadingFiles((prevUploads) => [...prevUploads, newUploadFile]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + "% done");
        setUploadingFiles((prevUploads) => {
          const updatedUploads = prevUploads.map((prevUpload) =>
            prevUpload.name === newUploadFile.name
              ? { ...prevUpload, progress: progress }
              : prevUpload
          );
          return updatedUploads;
        });
        console.log("Second state of uploaded file =>", uploadingFiles);
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("file available at", downloadURL);
        });
      }
    );
  };

  const handleFileDeletion = (fileName) => {
    const fileRef = ref(storage, fileName);

    deleteObject(fileRef)
      .then(() => {
        setUploadingFiles((prevUploads) =>
          prevUploads.filter((prevUpload) => prevUpload.name !== fileName)
        );

        const fileInput = document.getElementById("fileUpload");
        if (fileInput) {
          fileInput.value = "";
        }
        console.log(`file ${fileName} deleted successfully.`);
      })
      .catch((error) => {
        console.error("error deleting file:", error.message);
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div onClick={onClose} className="job-apply-form-curtain-modal | modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="job-apply-container | modal-content"
      >
        <div className="form-close-button-container" onClick={onClose}>
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
          <form className="form">
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
            <div className="job-apply-form-file-upload-parent-container | form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                Upload files
              </label>
              <div className="job-apply-form-file-upload-container">
                <div
                  className="job-apply-form-file-upload-dnd"
                  onDrop={(event) => {
                    event.preventDefault();
                    handleFileUpload(event.dataTransfer.files[0]);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span className="file-upload-instruction">
                    Drag and drop a file of type pdf, png, jpeg, doc, ppt up to
                    10MB
                  </span>
                  <span>or</span>
                  <label htmlFor="fileUpload" className="file-upload-button">
                    Choose a file
                  </label>
                  <input
                    id="fileUpload"
                    className="file-upload-input"
                    type="file"
                    onChange={(event) =>
                      handleFileUpload(event.target.files[0])
                    }
                  />
                </div>
              </div>
            </div>
            <div className="job-apply-form-uploadedfiles-container">
              <ul className="uploadedfiles-list">
                {uploadingFiles.map((uploadingFile) => (
                  <li className="uploadedfiles-file" key={uploadingFile.name}>
                    <div
                      onClick={() => handleFileDeletion(uploadingFile.name)}
                      className="delete-uploaded-file-button-container"
                    >
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
                    <div className="file-icon-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="currentColor"
                          d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
                        />
                      </svg>
                    </div>
                    <div className="file-name-and-progress-container">
                      <span className="file-name | display-block">
                        {uploadingFile.name}
                      </span>
                      <progress
                        className="display-block"
                        value={uploadingFile.progress}
                        max="100"
                      ></progress>
                      <span className="upload-progress-number | display-block">
                        {uploadingFile.progress}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

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
  );
}
