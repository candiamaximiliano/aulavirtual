import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  getClases,
  getCursos,
  putClases,
} from "../../redux/actions/profesorado";
import style from "./Modificadores.module.css";
import accesoDenegado from "../../images/error/403.png";

export const ClasesModificador = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getClases());
  }, [dispatch]);

  const clases = useSelector((state) => state.profesorado.clases);
  const cursos = useSelector((state) => state.profesorado.cursos);

  let clasesFiltrada = clases.find((clase) => {
    return Number(clase.id) === Number(id);
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    nombre: clasesFiltrada.nombre,
    url: clasesFiltrada.url,
    profesores: clasesFiltrada.profesores,
    recursos: clasesFiltrada.recursos,
  });

  const handleOnSelect = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      curso: e.target.value,
    });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.nombre && input.url) {
      dispatch(putClases(id, input));
      setSuccess(true);
      // alert("Clase subida correctamente");
      setErrors("");
      setInput({
        nombre: clasesFiltrada.nombre,
        url: clasesFiltrada.url,
        profesores: clasesFiltrada.profesores,
        recursos: clasesFiltrada.recursos,
      });
    } else {
      alert("DATA REQUIRED");
      setSuccess(false);
    }
  };

  useEffect(() => {
    dispatch(getCursos());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {currentUser.roles[1] === "ROLE_ADMIN" ? (
        <div className={style.subContainer}>
          <h1>Modificar clase: {clasesFiltrada?.nombre}</h1>
          <form
            className={style.form}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.nombre}
                name="nombre"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder={clasesFiltrada.nombre}
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.url}
                name="url"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder={clasesFiltrada.url}
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.profesores}
                name="profesores"
                placeholder={clasesFiltrada.profesores}
                autoComplete="off"
                onChange={(e) => {
                  handleOnChange(e);
                }}
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.recursos}
                name="recursos"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder={clasesFiltrada.recursos}
                autoComplete="off"
              ></input>
            </div>
            <div>
              <button className={style.buttonForm} type="submit">
                Actualizar Video
              </button>
            </div>
          </form>
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
