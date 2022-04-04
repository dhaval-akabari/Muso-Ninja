import { ref } from "vue";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const useCollection = (_collection) => {
  const error = ref(null);
  const isPending = ref(false);

  const saveDoc = async (_doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await addDoc(collection(db, _collection), _doc);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send data.";
      isPending.value = false;
    }
  };

  return { error, saveDoc, isPending };
};

export default useCollection;
