import { storage } from "../firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

export const deleteFile = async (fileName, onSuccess, onError) => {
  const fileRef = ref(storage, fileName);

  try {
    await deleteObject(fileRef);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};
