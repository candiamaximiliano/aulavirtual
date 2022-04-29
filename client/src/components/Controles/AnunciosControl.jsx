import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteAnuncios, getAnuncios } from "../../redux/actions/profesorado";
import style from "./Controles.module.css";
import accesoDenegado from "../../images/error/403.png";
import edit from "../../images/herramientas/edit_FILL0_wght400_GRAD0_opsz48.svg";

export const AnunciosControl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);
  const anuncios = useSelector((state) => state.profesorado.anuncios);

  const handleOnRemove = useCallback(
    (id) => {
      dispatch(deleteAnuncios(id));
      // alert(`Clase ${id} borrada correctamente`);
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAnuncios());
  }, [dispatch, handleOnRemove]);

  return (
    <div className={style.container}>
      {currentUser.roles[1] === "ROLE_ADMIN" ? (
        <div className={style.subContainer}>
          <Link className={style.link} to="upload">
            Subir Anuncio
          </Link>
          <ol className={style.lista}>
            {anuncios?.map((anuncio, index) => {
              return (
                <li className={style.item} key={index}>
                  {"ID: " + anuncio.id + " | CLASE: " + anuncio.nombre}{" "}
                  <button
                    className={style.button}
                    onClick={() => handleOnRemove(anuncio.id)}
                  >
                    X
                  </button>
                  <button
                    className={style.button}
                    onClick={() => navigate(`${anuncio.id}`)}
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
