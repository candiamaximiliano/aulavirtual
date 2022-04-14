import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";

const Cursos = () => {
  return (
    <>
      <Nav />
      <h1>Seleccione un año</h1>
      <ul>
        <li>
          <Link to="/cursos/instructorado">
            Instructorado en Salsa y Bachata
          </Link>
        </li>
        <li>
          <Link to="/cursos/especializacion">
            Especialización en Estilo y Coreografía
          </Link>
        </li>
        <li>
          <Link to="/cursos/profesorado">Profesorado en Ritmos Caribeños</Link>
        </li>
      </ul>
      <Footer />
    </>
  );
};

export default Cursos;
