import React, { useState } from "react";
import Layout from "@/components/layouts/Layout";
import Router from "next/router";
import { css } from "@emotion/react";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";
import firebase from "../firebase";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState(false);
  const { valores, handleChange, handleSubmit, errores, handleBlur } = useValidacion(
    STATE_INICIAL,
    validarIniciarSesion,
    iniciarSesion
  );
  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);

      Router.push("/");
    } catch (error) {
      console.log("error al autenticar el usuario", error.message);
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
          Iniciar Sesión
        </h1>
        <Formulario onSubmit={handleSubmit} noValidate>
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
            <label htmlFor="password">Password</label>
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
          <InputSubmit type="submit" value="Iniciar Sesión" />
        </Formulario>
      </>
    </Layout>
  );
};

export default Login;
