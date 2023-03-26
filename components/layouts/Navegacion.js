import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
const Navegacion = () => {
  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>
      <Link href="/nuevo-producto">NuevoProducto</Link>
    </Nav>
  );
};

export default Navegacion;

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: "PT Sans", sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
