import React from "react";
import styled from "@emotion/styled";
import Layout from "@/components/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Heading>Inicio</Heading>
    </Layout>
  );
}

const Heading = styled.h1`
  color: red;
`;
