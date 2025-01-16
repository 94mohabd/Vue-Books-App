import { db } from "../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ref, watchEffect } from "vue"

const getCollection = (collec, userId) => {
    const documents = ref(null);
    const error = ref(null);

    let collectionRef = query(collection(db, collec));

    if (userId) {
        collectionRef = query(
            collection(db, collec),
            where('userId', '==', userId), // Filter by userId           
        );
    }
    const unsub = onSnapshot(collectionRef, snap => {
        let results = [];
        snap.docs.forEach(doc => {
            doc.data() && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results;
        error.value = null;
    }, (err) => {
        console.log(err.message);
        documents.value = null;
        error.value = "could not fetch data";
    });

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })
    return { documents, error }
}

export default getCollection