import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const userFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    loadDocument();
  }, [docCollection, id])

  console.log(document)

  return { 
    document,
    error,
    loading }
}