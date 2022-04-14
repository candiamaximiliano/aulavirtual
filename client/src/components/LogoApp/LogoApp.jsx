import React from "react";
import "./LogoApp.css";
import { Link } from "react-router-dom";
import Logo from "../../logo.svg";

const LogoApp = () => {
  return (
    <div className="containerLayout">
      <Link to="/login">
        <div className="imageContainer">
          <img className="logoLayout" src={Logo} alt="LogoApp"></img>
        </div>
      </Link>
      <div>
        <p>Click en la imagen para ingresar al aula</p>
      </div>
    </div>
  );
};

export default LogoApp;
