import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteClases, getClases } from "../../redux/actions/profesorado";
import style from "./Controles.module.css";
import accesoDenegado from "../../images/error/403.png";
import edit from "../../images/herramientas/edit_FILL0_wght400_GRAD0_opsz48.svg";

export const ClasesControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);
  const clases = useSelector((state) => state.profesorado.clases);

  const handleOnRemove = useCallback(
    (id) => {
      dispatch(deleteClases(id));
      // alert(`Clase ${id} borrada correctamente`);
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getClases());
  }, [dispatch, handleOnRemove]);

  return (
    <div className={style.container}>
      {currentUser.roles[1] === "ROLE_ADMIN" ? (
        <div className={style.subContainer}>
          <Link className={style.link} to="upload">
            Subir Clase
          </Link>
          <ol className={style.lista}>
            {clases?.map((clase, index) => {
              return (
                <li className={style.item} key={index}>
                  {"ID: " + clase.id + " | CLASE: " + clase.nombre}{" "}
                  <button
                    className={style.button}
                    onClick={() => handleOnRemove(clase.id)}
                  >
                    X
                  </button>
                  <button
                    className={style.button}
                    onClick={() => navigate(`${clase.id}`)}
                  >
                    <img className={style.edit} src={edit} alt="boton editar" />
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
