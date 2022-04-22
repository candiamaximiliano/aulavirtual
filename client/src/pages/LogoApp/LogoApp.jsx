import React, { useCallback, useEffect } from "react";
import style from "./LogoApp.module.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../logo.svg";

const LogoApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/anuncios");
    }, 4000);
  }, []);

  return (
    <div className={style.containerLayout}>
      <Link to="/anuncios">
        <div className={style.imageContainer}>
          <img className={style.logoLayout} src={Logo} alt="LogoApp"></img>
        </div>
      </Link>
    </div>
  );
};

export default LogoApp;
