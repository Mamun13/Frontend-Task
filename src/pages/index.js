import React, { useState, useEffect } from "react";
import Head from "next/head";
import HomePage from "../../components/homepage/Home";
import Menu from "../../components/menu/Menu";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Head>
        <title>Assignment </title>
        <meta name="description" content="Generated by Mamun" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>
          <Container>
            <Menu />
            <HomePage />
          </Container>
        </main>
      </div>
    </>
  );
}
