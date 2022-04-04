import { ref } from "vue";
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import getUser from "./getUser";

const storage = getStorage();
const { user } = getUser();

const useStorage = () => {
  const url = ref(null);
  const filePath = ref(null);
  const error = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = sRef(storage, filePath.value);

    try {
      const res = await uploadBytes(storageRef, file);
      url.value = await getDownloadURL(storageRef);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = sRef(storage, path);

    try {
      await deleteObject(storageRef);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
