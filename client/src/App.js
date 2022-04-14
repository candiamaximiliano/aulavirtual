import {
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import LogoApp from "./components/LogoApp/LogoApp";
import Login from "./components/Login/Login";
import Registro from "./components/Registro/Registro";
import Cursos from "./components/Cursos/Cursos"
import Instructorado from "./components/Instructorado/Instructorado";
import Especializacion from "./components/Especialización/Especializacion";
import Profesorado from "./components/Profesorado/Profesorado";
import { useState } from "react";
import SubirContenido from "./components/SubirContenido/SubirContenido";

function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  
  return (
      <>
        <Routes>
          <Route path="/" element={<LogoApp />} />
          <Route path="login" element={<Login errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}/>} />
          <Route path="registro" element={<Registro errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}/>} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="cursos/instructorado" element={<Instructorado />} />
          <Route path="cursos/especializacion" element={<Especializacion />} />
          <Route path="cursos/profesorado" element={<Profesorado />} />
          <Route path="cursos/subircontenido" element={<SubirContenido />} />
      </Routes>
      </>
  );
}

export default App;
