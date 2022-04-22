import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserService from "../../../services/user.service";
import style from "../Boards.module.css";
import accesoDenegado from "../../../images/error/403.png";

const BoardAdmin = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");

  useEffect(() => {
    let cancel = false;
    UserService.getAdminBoard().then(
      (response) => {
        if (cancel) return;
        setContent(response.data);
      },
      (error) => {
        if (cancel) return;
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div className={style.container}>
      {currentUser.roles[1] === "ROLE_ADMIN" ? (
        <div className={style.subContainer}>
          <Link className={style.button} to="clases">
            Clases
          </Link>
          <Link className={style.button} to="materias">
            Materias
          </Link>
        </div>
      ) : (
        <div>
          <img
            className={style.error403}
            src={accesoDenegado}
            alt="acceso denegado"
          />
          <Link className={style.regresar} to="/">
            Regresar
          </Link>
        </div>
      )}
    </div>
  );
};

export default BoardAdmin;
