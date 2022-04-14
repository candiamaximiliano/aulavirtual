import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import image from "../../images/adrian-anita_example.jpg";
import Notification from "../Notificaciones/Notification";
import login from "../../services/login";
// import videosService from "../../services/videos";

const Login = ({ errorMessage, setErrorMessage }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // videosService.setToken(user.token);
    }
  }, []);

  // const handleLogout = () => {
  //   setUser(null);
  //   // videosService.setToken(null);
  //   window.localStorage.removeItem("loggedAppUser");
  // };

  const handlerLogin = async (e) => {
    e.preventDefault();

    try {
      const usuarioLogueado = await login({
        usuario,
        contraseña,
      });

      window.localStorage.setItem(
        "loggedAppUser",
        JSON.stringify(usuarioLogueado)
      );

      // videosService.setToken(usuarioLogueado.token);

      setUser(user);
      setUsuario("");
      setContraseña("");
      navigate("/cursos");
    } catch (error) {
      setErrorMessage("Usuario o contraseña incorrectos");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="loginContainer">
      <div className="container">
        <div className="leftContainer">
          <h3>AULA VIRTUAL</h3>
          <Notification message={errorMessage} />
          <form className="loginForm" onSubmit={handlerLogin}>
            <input
              className="inputFormLogin"
              type="text"
              value={usuario}
              name="Username"
              placeholder="Usuario"
              onChange={(e) => setUsuario(e.target.value)}
            />
            <input
              className="inputFormLogin"
              type="password"
              value={contraseña}
              name="Password"
              placeholder="Contraseña"
              onChange={(e) => setContraseña(e.target.value)}
            />
            <br />
            <button className="userButtonLogin">ACCEDER</button>
          </form>
          <span className="spanPassword">
            <a href="www.google.com">Olvidé mi usuario/contraseña</a>
          </span>
          <span>
            <p>¿Todavía no tenes un usuario?</p>
            <Link to="/registro">
              <p>Registrate</p>
            </Link>
          </span>
        </div>
        <div className="rightContainer">
          <img src={image} alt="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
