import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }

  async registrar(nombre, email, password) {
    const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log(nuevoUsuario);
    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre,
    });
  }
  async login(email, password) {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async cerrarSesion() {
    await signOut(this.auth);
  }

  async subirFotoAStorage(file) {
    const storageRef = ref(this.storage, "productos/" + file.name);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}

const firebase = new Firebase();

export default firebase;
