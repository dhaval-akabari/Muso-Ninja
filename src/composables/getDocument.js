import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { doc, query, onSnapshot } from "firebase/firestore";

const getDocument = (_collection, id) => {
  const document = ref(null);
  const error = ref(null);

  const res = doc(db, _collection, id);
  let documentRef = query(res);

  const unsubscribe = onSnapshot(
    documentRef,
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "that document does not exist.";
      }
    },
    (err) => {
      console.log(err.message);
      error.value = "could not fetch the document";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { error, document };
};

export default getDocument;
