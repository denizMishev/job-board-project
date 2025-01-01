import { storage } from "../firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

export const deleteFile = async (fileName: string): Promise<void> => {
  const fileRef = ref(storage, fileName);
  await deleteObject(fileRef);
};
