import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { allowedFileTypes, maxSizeInBytes } from "../utils/errorParameters";
import { fileErrorMessages } from "../utils/errorMessages";

/**
 * uploads a file to Firebase Storage with progress tracking and error handling.
 * validates file type and size.
 *
 * @param {file} file - accepts pdf, png, jpeg, doc, ppt up to 10MB.
 * @param {function} onProgress - callback function to receive upload progress percentage.
 * @param {function} onSuccess - callback function to receive the download url upon successful upload.
 * @param {function} onError - callback function to execute if an error occurs.
 */

export const uploadFile = (
  file: File,
  onProgress: (progress: number) => void,
  onSuccess: (downloadURL: string) => void,
  onError: (error: Error) => void
) => {
  if (!allowedFileTypes.includes(file.type)) {
    const error = new Error(fileErrorMessages.type);
    onError(error);
    return;
  }

  if (file.size > maxSizeInBytes) {
    const error = new Error(fileErrorMessages.size);
    onError(error);
    return;
  }

  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    },
    (error) => {
      onError(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          onSuccess(downloadURL);
        })
        .catch(onError);
    }
  );
};
