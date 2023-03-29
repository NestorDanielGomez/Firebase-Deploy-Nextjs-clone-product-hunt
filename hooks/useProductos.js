import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

const useProductos = (orden) => {
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    // Manejar los snapshots
    const manjejarSnapshot = (snapshot) => {
      const productos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductos(productos);
      setLoadingProductos(false);
    };
    // Manejar el error
    const manjearError = (error) => {
      console.log(error.message);
      setLoadingProductos(false);
      setErrorProductos(true);
    };
    const productosRef = query(collection(firebase.db, "productos"), orderBy(orden, "desc"));

    const unsuscribe = onSnapshot(productosRef, manjejarSnapshot, manjearError);

    return () => unsuscribe();
  }, [orden]);

  return [productos, loadingProductos, errorProductos];
};

export default useProductos;
