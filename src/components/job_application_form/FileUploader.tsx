import { useState } from "react";

import { FileList } from "./FileList";

import { useErrorBoundary } from "react-error-boundary";

import { uploadFile } from "../../api/uploadFile";
import { deleteFile } from "../../api/deleteFile";

interface UploadingFile {
  name: string;
  progress: number;
  fileURL: string | null;
  errorMessage?: string;
}

interface FileUploaderProps {
  setApplicantFileURLs: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FileUploader({ setApplicantFileURLs }: FileUploaderProps) {
  const { showBoundary } = useErrorBoundary();

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const handleFileUpload = (file: File) => {
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

  const handleFileDeletion = async (file: File) => {
    try {
      await deleteFile(file.name);

      setUploadingFiles((prevUploads) =>
        prevUploads.filter((prevUpload) => prevUpload.name !== file.name)
      );

      const fileInput = document.getElementById("fileUpload");
      if (fileInput instanceof HTMLInputElement) {
        fileInput.value = "";
      } else
        throw {
          type: "DOM_ERR",
          message: "Please reach out to us for further assistnace",
        };
    } catch (error) {
      showBoundary(error);
    }
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
              onChange={(event) => handleFileUpload(event.target.files![0])}
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
