import { useState } from "react";

import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function JobApplyModal({ onClose, show }) {
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
    <div onClick={onClose} className="modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className="job-apply-container | modal-content padding-300"
      >
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
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                Cover letter
              </label>
              <textarea
                className="bg-neutral-100 color-primary-switch-100"
                name="coverLetter"
                cols="20"
                rows="5"
              ></textarea>
            </div>
            <div className="form-input-container color-primary-switch-100-light">
              <label className="form-field-label" htmlFor="">
                File
              </label>
              <div>
                <input
                  type="file"
                  onChange={(event) => setData(event.target.files[0])}
                />
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    border: "4px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                  }}
                ></div>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
            <button className="form-submit-button | button" type="submit">
              Submit
            </button>
          </form>
          <div className="switch-form">
            <span className="display-block color-primary-switch-100">
              Already have an account?
            </span>
            <button className="switch-form-cta color-linkblue">
              Log in
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
