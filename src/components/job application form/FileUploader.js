import { useState, useEffect } from "react";

import { FileList } from "./FileList";

import { fileErrorMessages } from "../../utils/errorMessages";
import { allowedFileTypes, maxSizeInBytes } from "../../utils/errorParameters";
import { useErrorBoundary } from "react-error-boundary";

import { storage } from "../../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export function FileUploader({ sendUploadFiles }) {
  const { showBoundary } = useErrorBoundary([]);

  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleFileUpload = (file) => {
    const newUploadFile = {
      name: file.name,
      progress: 0,
      fileURL: null,
    };

    if (!allowedFileTypes.includes(file.type)) {
      newUploadFile.errorMessage = fileErrorMessages.type;

      console.error("unsupported file type");
    }

    if (file.size > maxSizeInBytes) {
      newUploadFile.errorMessage = fileErrorMessages.size;

      console.error("error size");
    }

    setUploadingFiles((prevUploads) => [...prevUploads, newUploadFile]);

    if (newUploadFile.errorMessage) {
      console.log("file error");
      return;
    }

    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
      },
      (error) => {
        showBoundary(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("file available at", downloadURL);

          setUploadingFiles((prevUploads) => {
            const updatedUploads = prevUploads.map((prevUpload) =>
              prevUpload.name === newUploadFile.name
                ? { ...prevUpload, fileURL: downloadURL }
                : prevUpload
            );
            return updatedUploads;
          });
        });
      }
    );
  };

  const handleFileDeletion = (file) => {
    const fileName = file.name;

    setUploadingFiles((prevUploads) =>
      prevUploads.filter((prevUpload) => prevUpload.name !== fileName)
    );

    const fileInput = document.getElementById("fileUpload");
    if (fileInput) {
      fileInput.value = "";
    }

    if (file.errorMessage) return;

    const fileRef = ref(storage, fileName);

    deleteObject(fileRef)
      .then(() => {
        console.log(`file ${fileName} deleted successfully.`);
      })
      .catch((error) => {
        console.error("error deleting file:", error.message);
        showBoundary(error);
      });
  };

  useEffect(() => {
    sendUploadFiles(uploadingFiles);
  }, [uploadingFiles]);

  return (
    <>
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
              Drag and drop a file of type pdf, png, jpeg, doc, ppt up to 10MB
            </span>
            <span>or</span>
            <label htmlFor="fileUpload" className="file-upload-button">
              Choose a file
            </label>
            <input
              id="fileUpload"
              className="file-upload-input"
              required
              type="file"
              onChange={(event) => handleFileUpload(event.target.files[0])}
            />
          </div>
        </div>
      </div>
      <div className="job-apply-form-uploadedfiles-container">
        <FileList
          uploadingFiles={uploadingFiles}
          handleFileDeletion={handleFileDeletion}
        ></FileList>
      </div>
    </>
  );
}
