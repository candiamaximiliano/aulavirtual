import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMaterias } from "../../redux/actions/profesorado";
import style from "./Materias.module.css";
import accesoDenegado from "../../images/error/403.png";

export const Materias = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMaterias());
  }, []);

  const materias = useSelector((state) => state.profesorado.materias);
  const { user: currentUser } = useSelector((state) => state.auth);

  let materiasFiltradas = [];
  if (id === "1" && currentUser.instructorado) {
    materiasFiltradas = materias.filter((materia) => {
      return materia.curso.nombre === "Instructorado en Salsa y Bachata";
    });
  }
  if (id === "2" && currentUser.especializacion) {
    materiasFiltradas = materias.filter((materia) => {
      return materia.curso.nombre === "Especialización en Estilo y Coreografía";
    });
  }
  if (id === "3" && currentUser.profesorado) {
    materiasFiltradas = materias.filter((materia) => {
      return materia.curso.nombre === "Profesorado en Ritmos Caribeños";
    });
  }

  console.log(materiasFiltradas);

  return (
    <div>
      {currentUser.roles[0] === "ROLE_USER" && materiasFiltradas.length > 0 ? (
        <div className={style.container}>
          <h2 className={style.title}>Seleccione una materia</h2>
          <ol className={style.list}>
            {materiasFiltradas?.map((materia, index) => {
              return (
                <Link className={style.link} to={materia.nombre}>
                  <li className={style.item} key={index}>
                    {materia.nombre}
                  </li>
                </Link>
              );
            })}
          </ol>
        </div>
      ) : (
        <div className={style.errorContainer}>
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
