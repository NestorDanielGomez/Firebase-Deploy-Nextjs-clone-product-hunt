import React from "react";
import Layout from "@/components/layouts/Layout";
import useProductos from "../hooks/useProductos";
import DetallesProducto from "../components/layouts/DetallesProducto";

const Populares = () => {
  const [productos] = useProductos("votos");
  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {productos.map((producto) => (
              <DetallesProducto key={producto.id} producto={producto} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Populares;
