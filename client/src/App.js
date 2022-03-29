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

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<LogoApp />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="cursos/instructorado" element={<Instructorado />} />
          <Route path="cursos/especializacion" element={<Especializacion />} />
          <Route path="cursos/profesorado" element={<Profesorado />} />
      </Routes>
      </>
  );
}

export default App;
