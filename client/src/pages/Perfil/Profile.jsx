import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../images/herramientas/edit_FILL0_wght400_GRAD0_opsz48.svg";
import style from "./Profile.module.css";
import { putUser } from "../../redux/actions/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [successful, setSuccessful] = useState(false);

  const [base64, setBase64] = useState("");
  const imgProfile = useRef();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [disabledInputs, setDisabledInputs] = useState({
    base64: "disabled",
    nombre: "disabled",
    apellido: "disabled",
    usuario: "disabled",
    email: "disabled",
    dni: "disabled",
    fechaDeNacimiento: "disabled",
    direccion: "disabled",
    numeroDeContacto: "disabled",
    instructorado: "disabled",
    especializacion: "disabled",
    profesorado: "disabled",
  });

  const [input, setInput] = useState({
    fotoDePerfil: currentUser.fotoDePerfil,
    base64: currentUser.base64,
    nombre: currentUser.nombre,
    apellido: currentUser.apellido,
    usuario: currentUser.usuario,
    email: currentUser.email,
    dni: currentUser.dni,
    fechaDeNacimiento: currentUser.fechaDeNacimiento,
    direccion: currentUser.direccion,
    numeroDeContacto: currentUser.numeroDeContacto,
    instructorado: currentUser.instructorado,
    especializacion: currentUser.especializacion,
    profesorado: currentUser.profesorado,
  });

  const handleEdit = (e, id) => {
    e.preventDefault();
    setDisabledInputs({
      ...disabledInputs,
      [id]: null,
    });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    showFile();
  };

  function showFile() {
    var demoImage = imgProfile.current;
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      demoImage.src = reader.result;
    };
    reader.readAsDataURL(file);
    console.log(file);
    let base64;
    setTimeout(() => {
      base64 = demoImage.src.split(",");
      setInput({
        ...input,
        base64: base64[1],
      });
    }, 1000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    dispatch(putUser(currentUser.id, input))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  if (successful) {
    alert("Datos actualizados correctamente");
    setSuccessful(false);
    setInput({
      base64: currentUser.base64,
      nombre: currentUser.nombre,
      apellido: currentUser.apellido,
      usuario: currentUser.usuario,
      email: currentUser.email,
      dni: currentUser.dni,
      fechaDeNacimiento: currentUser.fechaDeNacimiento,
      direccion: currentUser.direccion,
      numeroDeContacto: currentUser.numeroDeContacto,
      instructorado: currentUser.instructorado,
      especializacion: currentUser.especializacion,
      profesorado: currentUser.profesorado,
    });
    setDisabledInputs({
      base64: "disabled",
      nombre: "disabled",
      apellido: "disabled",
      usuario: "disabled",
      email: "disabled",
      dni: "disabled",
      fechaDeNacimiento: "disabled",
      direccion: "disabled",
      numeroDeContacto: "disabled",
      instructorado: "disabled",
      especializacion: "disabled",
      profesorado: "disabled",
    });
  }

  if (!currentUser) {
    return navigate("/login");
  }

  return (
    <div className={style.superContainer}>
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.editContainer}>
            <div className={style.profileContainer}>
              <img
                className={style.profileImage}
                src={"data:image/png;base64," + currentUser.base64}
                alt="foto de perfil"
                ref={imgProfile}
              />
            </div>
            <button
              type="button"
              onClick={(e) => handleEdit(e, "base64")}
              className={style.button}
            >
              <img className={style.edit} src={edit} alt="boton editar" />
            </button>
          </div>
          <form>
            <input
              type="file"
              // accept="image/x-png,image/jpeg"
              disabled={disabledInputs.base64}
              className={style.formControlImage}
              name="fotoDePerfil"
              value={input.fotoDePerfil}
              onChange={handleOnChange}
              placeholder="Foto de perfil"
            />
          </form>
          <h3 className={style.title}>
            <strong>{currentUser.nombre + " " + currentUser.apellido}</strong>
          </h3>
        </header>
        <form className={style.formLayout} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.subContainer}>
            <p className={style.formGroup}>
              <strong>Nombre:</strong>{" "}
              <input
                id="nombre"
                disabled={disabledInputs.nombre}
                name="nombre"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={style.formInput}
                type="text"
                value={input.nombre}
                autoComplete="off"
              ></input>{" "}
              <button
                type="button"
                onClick={(e) => handleEdit(e, "nombre")}
                className={style.button}
              >
                <img className={style.edit} src={edit} alt="boton editar" />
              </button>
            </p>
            <p className={style.formGroup}>
              <strong>Apellido:</strong>
              <input
                id="apellido"
                disabled={disabledInputs.apellido}
                name="apellido"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={style.formInput}
                type="text"
                value={input.apellido}
                autoComplete="off"
              ></input>{" "}
              <button
                type="button"
                onClick={(e) => handleEdit(e, "apellido")}
                className={style.button}
              >
                <img className={style.edit} src={edit} alt="boton editar" />
              </button>
            </p>
            <p className={style.formGroup}>
              <strong>Usuario:</strong>
              <input
                id="usuario"
                disabled={disabledInputs.usuario}
                name="usuario"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={style.formInput}
                type="text"
                value={input.usuario}
                autoComplete="off"
              ></input>{" "}
              <button
                type="button"
                onClick={(e) => handleEdit(e, "usuario")}
                className={style.button}
              >
                <img className={style.edit} src={edit} alt="boton editar" />
              </button>
            </p>
            <p className={style.formGroup}>
              <strong>E-mail:</strong>
              <input
                id="email"
                disabled={disabledInputs.email}
                name="email"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={style.formInput}
                type="text"
                value={input.email}
                autoComplete="off"
              ></input>{" "}
              <button
                type="button"
                onClick={(e) => handleEdit(e, "email")}
                className={style.button}
              >
                <img className={style.edit} src={edit} alt="boton editar" />
              </button>
            </p>
            <p className={style.formGroup}>
              <strong>DNI:</strong>
              <input
                id="dni"
                disabled={disabledInputs.dni}
                name="dni"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={style.formInput}
                type="text"
                value={input.dni}
                autoComplete="off"
              ></input>{" "}
              <button
                type="button"
                onClick={(e) => handleEdit(e, "dni")}
                className={style.button}
              >
                <img className={style.edit} src={edit} alt="boton editar" />
              </button>
            </p>
            <p className={style.formGroup}>
              <strong>Fecha de Nacimiento:</strong>
              <input
                id="fecha"
                disabled={disabledInputs.fechaDeNacimiento}
                name="fecha"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={style.formInput}
                type="text"
                value={input.fechaDeNacimiento}
                autoComplete="off"
              ></input>{" "}
              <button
                type="button"
                onClick={(e) => handleEdit(e, "fechaDeNacimiento")}
                className={style.button}
              >
                <img className={style.edit} src={edit} alt="boton editar" />
              </button>
            </p>
            <p className={style.formGroup}>
              <strong>Dirección:</strong>
              <input
                id="direccion"
                disabled={disabledInputs.direccion}
                name="direccion"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={style.formInput}
                type="text"
                value={input.direccion}
                autoComplete="off"
              ></input>{" "}
              <button
                type="button"
                onClick={(e) => handleEdit(e, "direccion")}
                className={style.button}
              >
                <img className={style.edit} src={edit} alt="boton editar" />
              </button>
            </p>
            <p className={style.formGroup}>
              <strong>Número de contacto:</strong>
              <input
                id="contacto"
                disabled={disabledInputs.numeroDeContacto}
                name="contacto"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                className={style.formInput}
                type="text"
                value={input.numeroDeContacto}
                autoComplete="off"
              ></input>{" "}
              <button
                type="button"
                onClick={(e) => handleEdit(e, "numeroDeContacto")}
                className={style.button}
              >
                <img className={style.edit} src={edit} alt="boton editar" />
              </button>
            </p>
            <div className={style.buttonContainer}>
              <button className={style.formButton} type="submit">
                ACTUALIZAR DATOS
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;
