import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import LogoApp from "./pages/LogoApp/LogoApp";
import { Nav } from "./components/Nav/Nav";
import Login from "./pages/Login/Login";
import Register from "./pages/Registro/Registro";
import Anuncios from "./pages/Home/Anuncios";
import Profile from "./pages/Perfil/Profile";
import BoardUser from "./pages/Boards/User/BoardUser";
import BoardModerator from "./pages/Boards/Profesor/BoardProfesor";
import BoardAdmin from "./pages/Boards/Admin/BoardAdmin";
import { Materias } from "./components/Materias/Materias";
import { Clases } from "./components/Clases/Clases";
import { MateriasControl } from "./components/Controles/MateriasControl";
import { ClasesControl } from "./components/Controles/ClasesControl";
import { AnunciosControl } from "./components/Controles/AnunciosControl";
import { ClasesModificador } from "./components/Controles/ClasesModificador";
import { AnunciosModificador } from "./components/Controles/AnunciosModificador";
import { SubirClase } from "./components/Controles/SubirClase";
import { SubirAnuncio } from "./components/Controles/SubirAnuncio";
import { MateriasModificador } from "./components/Controles/MateriasModificador";
import { NotFound } from "./pages/Error/NotFound";
import Detail from "./pages/Detail/Detail";


function App() {
  return (
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<LogoApp />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/anuncios/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cursos" element={<BoardUser />} />
          <Route path="/cursos/:id" element={<Materias />} />
          <Route path="/cursos/:id/:materia" element={<Clases />} />
          <Route path="/cursos/:id/:materia/:claseId" element={<Clases />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/admin/materias" element={<MateriasControl />} />
          <Route path="/admin/materias/:id" element={<MateriasModificador />} />
          <Route path="/admin/clases" element={<ClasesControl />} />
          <Route path="/admin/clases/:id" element={<ClasesModificador />} />
          <Route path="/admin/clases/upload" element={<SubirClase />} />
          <Route path="/admin/anuncios" element={<AnunciosControl />} />
          <Route path="/admin/anuncios/:id" element={<AnunciosModificador />} />
          <Route path="/admin/anuncios/upload" element={<SubirAnuncio />} />
          <Route path="/*" element={<NotFound />} />
      </Routes>
      </>
  );
}

export default App;
