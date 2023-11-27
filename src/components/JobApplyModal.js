import { useState } from "react";
import { useParams } from "react-router";

import { database, storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export function JobApplyModal({ onClose, show }) {
  const { jobId } = useParams();
  const [data, setData] = useState({});

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    setData(file);
    // handleSubmit();
  };

  console.log(data);

  const handleSubmit = (e) => {
    console.log(data);
    if (e) {
      e.preventDefault();
    }
    const storageRef = ref(storage, data.name);
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is" + progress + "% done");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("file available at", downloadURL);
        });
      }
    );
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
              Senior EJB Developer
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
              ></textarea>
            </div>
            <div className="job-apply-form-file-upload-parent-container | form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                Upload files
              </label>
              <div className="job-apply-form-file-upload-container">
                <div
                  className="job-apply-form-file-upload-dnd"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
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
                    onChange={(event) => setData(event.target.files[0])}
                  />
                </div>
                {/* <button onClick={handleSubmit}>Submit</button> */}
              </div>
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
