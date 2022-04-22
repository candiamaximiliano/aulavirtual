import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getMaterias, putMaterias } from "../../redux/actions/profesorado";
import style from "./Modificadores.module.css";
import accesoDenegado from "../../images/error/403.png";

export const MateriasModificador = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMaterias());
  }, [dispatch]);

  const materias = useSelector((state) => state.profesorado.materias);

  let materiaFiltrada = materias.find((materia) => {
    return Number(materia.id) === Number(id);
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    materia: "",
  });

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
    if (input.nombre) {
      dispatch(putMaterias(id, input));
      setSuccess(true);
      // alert("Clase subida correctamente");
      setErrors("");
      setInput({
        materia: "",
      });
    } else {
      alert("DATA REQUIRED");
      setSuccess(false);
    }
  };

  return (
    <div className={style.container}>
      {currentUser.roles[1] === "ROLE_ADMIN" ? (
        <div className={style.subContainer}>
          <h1>Modificar materia: {materiaFiltrada?.nombre}</h1>
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
                placeholder={materiaFiltrada.nombre}
                autoComplete="off"
              ></input>
            </div>
            <div>
              <button className={style.buttonForm} type="submit">
                Guardar Cambios
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
