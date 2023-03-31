import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "@/firebase";
import { collection, getDoc, doc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Layout from "@/components/layouts/Layout";
import Error404 from "@/components/layouts/Error404";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Boton from "@/components/ui/Boton";
import BotonA from "@/components/ui/BotonA";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

import { Campo, InputSubmit } from "@/components/ui/Formulario";

const Producto = () => {
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});
  const [consultarDb, setConsultarDb] = useState(true);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDb) {
      const obtenerProducto = async () => {
        const productoQuery = doc(collection(firebase.db, "productos"), id);
        const productoID = await getDoc(productoQuery);

        if (productoID.exists()) {
          setProducto(productoID.data());
          setConsultarDb(false);
          // setError(false);
        } else {
          setError(true);
          setConsultarDb(false);
          //setError(true);
        }
      };

      obtenerProducto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (Object.keys(producto).length === 0 && !error) return "Cargando.....";

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
    creador,
    haVotado,
  } = producto;

  const votaProducto = () => {
    if (!usuario) {
      return router.push("/login");
    }
    const nuevoTotalVotos = votos + 1;
    // verifico si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) {
      return;
    }
    // guardo el id del usuario que voto
    const nuevoHanVotado = [...haVotado, usuario.uid];

    //actualizo db
    const docRef = doc(firebase.db, "productos", `${id}`);
    updateDoc(docRef, {
      votos: increment(nuevoTotalVotos),
      haVotado: nuevoHanVotado,
    });
    //actualizo state
    setProducto({ ...producto, votos: nuevoTotalVotos });
    //si hay un voto vuelvo a consultar firebase
    setConsultarDb(true);
  };

  const changeComentario = (e) => {
    setComentario({ ...comentario, [e.target.name]: e.target.value });
  };

  const agregarComentario = async (e) => {
    e.preventDefault();
    if (!usuario) {
      return router.push("/login");
    }
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;
    const nuevosComentarios = [...comentarios, comentario];

    //actualizo db
    const productoQuery = doc(collection(firebase.db, "productos"), id);

    updateDoc(productoQuery, {
      comentarios: nuevosComentarios,
    });

    //actualizo state
    setProducto({ ...producto, comentarios: nuevosComentarios });
    //si hay un comentario vuelvo a consultar firebase
    setConsultarDb(true);
  };

  const esCreador = (id) => {
    if (creador.id === id) {
      return true;
    }
  };

  const puedeBorrar = (id) => {
    if (!usuario) {
      return false;
    }
    if (creador.id === usuario.uid) {
      return true;
    }
  };

  const eliminarProducto = async () => {
    if (!usuario) {
      return router.push("/login");
    }
    if (creador.id !== usuario.uid) {
      return router.push("/");
    }
    try {
      // Eliminar Producto
      await deleteDoc(doc(firebase.db, "productos", id));
      // Eliminar imagen
      const storage = getStorage();
      const imgRef = ref(storage, urlimagen);
      deleteObject(imgRef)
        .then(() => {
          // Imagen eliminada correctamente
        })
        .catch((error) => {
          console.log(error);
        });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}>
              {nombre}
            </h1>

            <ContenedorProducto>
              <div>
                <p>Publicado hace: {formatDistanceToNow(new Date(creado), { locale: es })} </p>
                <p>
                  Por: {creador.nombre} de: {empresa}
                </p>
                {/* <p>
                Por: {creador.nombre} de {empresa}
              </p> */}
                <img src={urlimagen} alt="img producto" />

                <p>{descripcion}</p>
                {usuario && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <input type="text" name="mensaje" onChange={changeComentario} />
                      </Campo>
                      <InputSubmit type="submit" value="Agregar Comentario" />
                    </form>
                  </>
                )}

                <h2
                  css={css`
                    margin: 2rem 0;
                  `}>
                  Comentarios
                </h2>
                {comentario.length === 0 ? (
                  "No hay comentarios"
                ) : (
                  <ul>
                    {comentarios.map((comentario, i) => (
                      <li
                        key={`${comentario.usuarioId}-${i}`}
                        css={css`
                          border: 1px solid var(--gris2);
                          padding: 2rem;
                        `}>
                        <p>{comentario.mensaje}</p>
                        <p>
                          Escrito por:
                          <span
                            css={css`
                              font-weight: bold;
                            `}>
                            {""}
                            {comentario.usuarioNombre}
                          </span>
                        </p>
                        {esCreador(comentario.usuarioId) && (
                          <CreadorProducto>Es Creador</CreadorProducto>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <aside>
                <BotonA target="_blank" bgColor="true" href={url}>
                  Visitar URL
                </BotonA>

                <p
                  css={css`
                    text-align: center;
                    background-color: var(--gris3);
                    padding: 1rem 0;
                  `}>
                  {votos} Votos
                </p>
                {usuario && <Boton onClick={votaProducto}>Votar</Boton>}
              </aside>
            </ContenedorProducto>
            {puedeBorrar() && <BotonA onClick={eliminarProducto}>Eliminar Producto</BotonA>}
          </div>
        )}
      </>
    </Layout>
  );
};

export default Producto;

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;
const CreadorProducto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;
