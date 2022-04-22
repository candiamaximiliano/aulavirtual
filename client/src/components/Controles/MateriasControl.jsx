import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMaterias, getMaterias } from "../../redux/actions/profesorado";
import style from "./Controles.module.css";
import accesoDenegado from "../../images/error/403.png";

export const MateriasControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);
  const materias = useSelector((state) => state.profesorado.materias);

  const handleOnRemove = useCallback(
    (id) => {
      dispatch(deleteMaterias(id));
      // alert(`Clase ${id} borrada correctamente`);
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getMaterias());
  }, [dispatch, handleOnRemove]);

  return (
    <div className={style.container}>
      {currentUser.roles[1] === "ROLE_ADMIN" ? (
        <div className={style.subContainer}>
          Ver Materias
          <ol className={style.lista}>
            {materias?.map((materia, index) => {
              return (
                <li className={style.item} key={index}>
                  {"ID: " + materia.id + " | MATERIA: " + materia.nombre}{" "}
                  <button
                    className={style.button}
                    onClick={() => handleOnRemove(materia.id)}
                  >
                    X
                  </button>
                  <button
                    className={style.button}
                    onClick={() => navigate(`${materia.id}`)}
                  >
                    Edit
                  </button>
                </li>
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
