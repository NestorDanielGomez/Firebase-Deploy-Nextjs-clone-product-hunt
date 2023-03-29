import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
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
}

const firebase = new Firebase();

export default firebase;
