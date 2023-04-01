import React, { useState } from "react";
import Layout from "@/components/layouts/Layout";
import Router from "next/router";
import { css } from "@emotion/react";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "@/validacion/validarCrearCuenta";
import firebase from "../firebase";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {
  const [error, setError] = useState(false);
  const { valores, handleChange, handleSubmit, errores, handleBlur } = useValidacion(
    STATE_INICIAL,
    validarCrearCuenta,
    crearCuenta
  );
  const { nombre, email, password } = valores;

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      Router.push("/");
    } catch (error) {
      console.log("error al generar un usuario", error.message);
      setError(error.message);
    }
  }
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Contraseña</label>
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
          {error && <Error>{error}</Error>}
          <InputSubmit type="submit" value="Crear cuenta" />
        </Formulario>
      </>
    </Layout>
  );
};

export default CrearCuenta;
