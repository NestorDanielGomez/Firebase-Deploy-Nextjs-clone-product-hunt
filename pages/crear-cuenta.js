import React from "react";
import Layout from "@/components/layouts/Layout";
import { css } from "@emotion/react";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "@/validacion/validarCrearCuenta";

const CrearCuenta = () => {
  const STATE_INICIAL = {
    nombre: "",
    email: "",
    password: "",
  };
  const { valores, handleChange, handleSubmit, errores, handleBlur } = useValidacion(
    STATE_INICIAL,
    validarCrearCuenta,
    CrearCuenta
  );
  const { nombre, email, password } = valores;
  function crearCuenta() {}
  return (
    <Layout>
      <>
        <h1
          css={css`
            margin-top: 5rem;
            text-align: center;
          `}>
          Crear Cuenta
        </h1>
        <Formulario onSubmit={handleSubmit} noValidate>
          <Campo className="">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu Nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.nombre && <Error>{errores.nombre}</Error>}
          <Campo className="">
            <label htmlFor="email">Nombre</label>
            <input
              type="text"
              id="email"
              placeholder="Tu email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}
          <Campo className="">
            <label htmlFor="password">Nombre</label>
            <input
              type="password"
              id="password"
              placeholder="Tu password"
              name="password"
              alue={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.password && <Error>{errores.password}</Error>}
          <InputSubmit type="submit" value="Crear cuenta" />
        </Formulario>
      </>
    </Layout>
  );
};

export default CrearCuenta;
