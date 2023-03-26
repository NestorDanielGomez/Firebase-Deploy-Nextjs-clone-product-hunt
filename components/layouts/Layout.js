import React from "react";
import Header from "./Header";
import { Global, css } from "@emotion/core";

const Layout = (props) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --gris: #3d3d3d;
            --gris: #6f6f6f;
            --naranja: #da552f;
          }
        `}
      />
      <Header />
      <main>{props.children}</main>;
    </>
  );
};

export default Layout;
