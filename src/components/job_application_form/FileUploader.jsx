import { useState } from "react";

import { FileList } from "./FileList";

import { useErrorBoundary } from "react-error-boundary";

import { uploadFile } from "../../api/uploadFile";
import { deleteFile } from "../../api/deleteFile";

export function FileUploader({ setApplicantFileURLs }) {
  const { showBoundary } = useErrorBoundary([]);

  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleFileUpload = (file) => {
    const newUploadFile = {
      name: file.name,
      progress: 0,
      fileURL: null,
    };

    setUploadingFiles((prevUploads) => [...prevUploads, newUploadFile]);

    uploadFile(
      file,
      (progress) => {
        setUploadingFiles((prevUploads) => {
          return prevUploads.map((prevUpload) =>
            prevUpload.name === newUploadFile.name
              ? { ...prevUpload, progress }
              : prevUpload
          );
        });
      },
      (downloadURL) => {
        const updatedFile = {
          ...newUploadFile,
          fileURL: downloadURL,
          progress: 100,
        };
        setUploadingFiles((prevUploads) => {
          return prevUploads.map((prevUpload) =>
            prevUpload.name === newUploadFile.name ? updatedFile : prevUpload
          );
        });
        setApplicantFileURLs((prevFileURLs) => [
          ...prevFileURLs,
          updatedFile.fileURL,
        ]);
      },
      (error) => {
        showBoundary(error);
      }
    );
  };

  const handleFileDeletion = (file) => {
    deleteFile(
      file.name,
      () => {
        setUploadingFiles((prevUploads) =>
          prevUploads.filter((prevUpload) => prevUpload.name !== file.name)
        );
        const fileInput = document.getElementById("fileUpload");
        if (fileInput) {
          fileInput.value = "";
        }
        console.log("file deleted successfully");
      },
      (error) => {
        showBoundary(error);
      }
    );
  };

  return (
    <>
      <div className="job-apply-form-file-upload-parent-container | form-input-container color-primary-switch-100-light">
        <label className="form-field-label" htmlFor="">
          Upload files
        </label>
        <div className="job-apply-form-file-upload-container">
          <div
            className="job-apply-form-file-upload-dnd"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(event) => {
              event.preventDefault();
              handleFileUpload(event.dataTransfer.files[0]);
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
