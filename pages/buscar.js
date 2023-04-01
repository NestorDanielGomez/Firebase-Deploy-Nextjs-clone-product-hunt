import React, { useEffect, useState } from "react";
import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import DetallesProducto from "@/components/layouts/DetallesProducto";
import useProductos from "@/hooks/useProductos";

const Buscar = () => {
  const router = useRouter();

  const {
    query: { q },
  } = router;

  const [productos] = useProductos("creado");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();
    console.log(busqueda);
    console.log(productos);
    const filtro = productos.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      );
    });
    setResultado(filtro);
  }, [q, productos]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Buscar;
