import { ref } from "vue";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const useDocument = (_collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const removeDoc = async () => {
    error.value = null;
    isPending.value = true;

    let docRef = doc(db, _collection, id);

    try {
      const res = await deleteDoc(docRef);

      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not delete the document";
      isPending.value = false;
    }
  };

  return { error, isPending, removeDoc };
};

export default useDocument;
