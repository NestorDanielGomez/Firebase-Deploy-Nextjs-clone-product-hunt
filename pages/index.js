import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/layouts/Layout";
import useProductos from "../hooks/useProductos";
import DetallesProducto from "../components/layouts/DetallesProducto";

export default function Home() {
  const [productos] = useProductos("creado");

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
}
