import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCursos, postClases } from "../../redux/actions/profesorado";
import style from "./SubirClase.module.css";
import accesoDenegado from "../../images/error/403.png";

// export function validate(input) {
//   let errors = {};

//   input.name ? (errors.name = "") : (errors.name = "You must name the recipe");

//   input.summary
//     ? (errors.summary = "")
//     : (errors.summary = "You must provide a summary");

//   input.diets.length < 1
//     ? (errors.diets = "Choose at least one diet")
//     : (errors.diets = "");

//   if (!input.image.includes("https://") && !input.image.includes("http://")) {
//     errors.image = "This isn't a valid image address";
//   } else {
//     errors.image = "";
//   }

//   // if (input.score < 1 || input.score > 100) {
//   //   errors.score = "Number required. Must be a number between 1-100";
//   // }
//   // if (input.healthScore < 1 || input.healthScore > 100) {
//   //   errors.healthScore = "Number required. Must be a number between 1-100";
//   // }

//   return errors;
// }

export const SubirClase = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const cursos = useSelector((state) => state.profesorado.cursos);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    curso: "",
    materia: "",
    nombre: "",
    url: "",
    profesores: "",
    recursos: "",
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
    if (input.curso && input.materia && input.nombre && input.url) {
      dispatch(postClases(input));
      setSuccess(true);
      // alert("Clase subida correctamente");
      setErrors("");
      setInput({
        curso: "",
        materia: "",
        nombre: "",
        url: "",
        profesores: "",
        recursos: "",
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
          <form
            className={style.form}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className={style.selectContainer}>
              <select
                className={style.select}
                onChange={(e) => {
                  handleOnSelect(e);
                }}
              >
                <option className={style.option} disabled selected>
                  Selecciona un curso
                </option>
                {cursos?.map((curso) => (
                  <option
                    className={style.option}
                    value={curso.nombre}
                    key={curso.id + "curso"}
                  >
                    {curso.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.materia}
                name="materia"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder="Materia a la que pertenece"
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.nombre}
                name="nombre"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder="Nombre de la clase"
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
                placeholder="Url del video"
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.profesores}
                name="profesores"
                placeholder="Profesor/a/es"
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
                placeholder="Recursos asociados a la clase"
                autoComplete="off"
              ></input>
            </div>
            <div>
              <button className={style.buttonForm} type="submit">
                Subir Video
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
