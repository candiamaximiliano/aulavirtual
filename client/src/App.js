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
import Home from "./pages/Home/Home";
import Profile from "./pages/Perfil/Profile";
import BoardUser from "./pages/Boards/User/BoardUser";
import BoardModerator from "./pages/Boards/Profesor/BoardProfesor";
import BoardAdmin from "./pages/Boards/Admin/BoardAdmin";


function App() {
  return (
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<LogoApp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
      </Routes>
      </>
  );
}

export default App;
