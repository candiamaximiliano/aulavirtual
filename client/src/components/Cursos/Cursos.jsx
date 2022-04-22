import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCursos } from "../../redux/actions/profesorado";
import style from "./Cursos.module.css";
import accesoDenegado from "../../images/error/403.png";

export const Cursos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCursos());
  }, []);

  const cursos = useSelector((state) => state.profesorado.cursos);
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div className={style.container}>
      {currentUser.roles[0] === "ROLE_USER" ? (
        <div className={style.cursosContainer}>
          <ol className={style.cursosLista}>
            {cursos?.map((curso, index) => {
              return (
                <Link className={style.cursosLink} to={`${curso.id}`}>
                  <li className={style.cursosItems} key={index}>
                    {curso.nombre}
                  </li>
                </Link>
              );
            })}
          </ol>
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
