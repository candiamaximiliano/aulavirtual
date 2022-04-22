import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getClases } from "../../redux/actions/profesorado";
import style from "./Clases.module.css";
import accesoDenegado from "../../images/error/403.png";

export const Clases = () => {
  const dispatch = useDispatch();
  const { materia } = useParams();

  useEffect(() => {
    dispatch(getClases());
  }, []);

  const clases = useSelector((state) => state.profesorado.clases);
  const { user: currentUser } = useSelector((state) => state.auth);

  let clasesFiltradas = clases.filter((clase) => {
    return clase.materium.nombre === materia;
  });

  const [clasePlayer, setClasePlayer] = useState({
    url: "https://www.youtube.com/embed/-d0iA_K4JF0",
  });

  const handlePlayer = (id) => {
    setClasePlayer(
      clasesFiltradas?.find((clase) => {
        return clase.id === id;
      })
    );
    console.log(clasePlayer);
  };

  return (
    <div>
      {currentUser.roles[0] === "ROLE_USER" ? (
        <div className={style.container}>
          <h2 className={style.title}>Clases</h2>
          <div className={style.playerContainer}>
            <ol className={style.list}>
              {clasesFiltradas?.map((clase, index) => {
                return (
                  <button
                    className={style.button}
                    onClick={() => handlePlayer(clase.id)}
                  >
                    <li className={style.item} key={index}>
                      {clase.nombre}
                    </li>
                  </button>
                );
              })}
            </ol>
            <div>
              <iframe
                className={style.iframe}
                src={clasePlayer.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
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
