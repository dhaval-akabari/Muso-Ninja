import { ref, watchEffect } from 'vue';
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const getCollection = (_collection) => {
    const documents = ref(null)
    const error = ref(null)

    const res = collection(db, _collection);
    let collectionRef = query(res, orderBy("createdAt"))

    const unsubscribe = onSnapshot(collectionRef, (snap) => {
        let results = []
        snap.forEach((doc) => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message);
        documents.value = null
        error.value = "could not fetch data"
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsubscribe())
    })

    return { error, documents }
}

export default getCollection

