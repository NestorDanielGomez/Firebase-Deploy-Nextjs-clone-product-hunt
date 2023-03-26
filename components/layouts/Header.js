import React from "react";
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="">
        <div className="">
          <p className="">P</p>
          <Buscar />
          <Navegacion />
        </div>
        <div className="">
          <p className="">Hola Nestor</p>
          <button type="button">Cerrar Sesion</button>
          <Link href="/">Login</Link>
          <Link href="/">Cerrar Cuenta</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
