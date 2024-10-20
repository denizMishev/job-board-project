import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { allowedFileTypes, maxSizeInBytes } from "../utils/errorParameters";
import { fileErrorMessages } from "../utils/errorMessages";

export const uploadFile = (file, onProgress, onSuccess, onError) => {
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
