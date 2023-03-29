//import '@/styles/globals.css'
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from "@/hooks/useAutenticacion";
import useProductos from "@/hooks/useProductos";

export default function App({ Component, pageProps }) {
  const usuario = useAutenticacion();
  const productos = useProductos;
  return (
    <FirebaseContext.Provider value={{ firebase, usuario }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
