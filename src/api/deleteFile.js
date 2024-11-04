import { storage } from "../firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

/**
 * deletes a file from Firebase Storage.
 *
 * @param {string} fileName - the name or path of the file to delete.
 * @param {function} onSuccess - callback function to execute on successful deletion.
 * @param {function} onError - callback function to execute if an error occurs.
 * @returns {promise<void>} resolves when file is deleted.
 */

export const deleteFile = async (fileName, onSuccess, onError) => {
  const fileRef = ref(storage, fileName);

  try {
    await deleteObject(fileRef);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};
