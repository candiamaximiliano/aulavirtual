import React from "react";
import "./LogoApp.css";
import Logo from "../../logo.svg";

const LogoApp = () => {
  return (
    <div className="containerLayout">
      <div className="imageContainer">
        <img src={Logo} alt="LogoApp"></img>
      </div>
    </div>
  );
};

export default LogoApp;
