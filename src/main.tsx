import React from "react";
import ReactDOM from "react-dom/client";

// TODO: TANSTACY QUERY 1

// IMPORTAR EN MAIN
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//TODO: REACT QUERY DEV TOOLS 2 ME SIRVE PARA PODER CHEQUEAR LAS CONSULTAS 
// USANDO ESTSA HERRAMIETNA

// APARECERA UN ICONO DE PLAYA EN LA PANTALLA LO APRETO Y APARECEN LAS DEVTOOLS
// EN LA CONSOLA DE CHROME
// Y POR CADA CONSULTA REALIZADA CON ESTA HERRAMIENTA APARECERA EL IDENTIFICACOR QUE LE PUSE
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


import "./index.css";
import Router from "./router";

// INSTANCIAR QUERY CIENT
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ENCERRAR LA APP EN ESTE COMPONENTE */}
    <QueryClientProvider client={queryClient}>
      <Router />

      {/* TODO: REACT QUERY DEV TOOLS 3 */}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>
);
