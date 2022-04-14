import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { postAlumnos } from "../../redux/actions";
import Notification from "../Notificaciones/Notification";

import "./Registro.css";

const Registro = ({ errorMessage, setErrorMessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    contraseña: "",
    dni: "",
    fechaDeNacimiento: "",
    direccion: "",
    numeroDeContacto: "",
    // consentimientoWhatsapp,
  });
  const handlerSignUp = (e) => {
    e.preventDefault();
    dispatch(postAlumnos(input));
    alert("Registrado correctamente");
    setInput({
      nombre: "",
      apellido: "",
      usuario: "",
      email: "",
      contraseña: "",
      dni: "",
      fechaDeNacimiento: "",
      direccion: "",
      numeroDeContacto: "",
      // consentimientoWhatsapp: "",
    });
    navigate("/login");
  };

  const handleChange = (e) => {
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

  return (
    <div className="backgroundContainer">
      <div className="signUpForm">
        <div className="formContainer">
          <h3>REGISTRO</h3>
          <Notification message={errorMessage} />
          <form className="registerForm" onSubmit={handlerSignUp}>
            <input
              className="inputForm"
              type="text"
              value={input.nombre}
              name="nombre"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Nombres"
              autoComplete="off"
            />
            <input
              className="inputForm"
              type="text"
              value={input.apellido}
              name="apellido"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Apellidos"
              autoComplete="off"
            />
            <input
              className="inputForm"
              type="text"
              value={input.usuario}
              name="usuario"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Usuario"
              autoComplete="off"
            />
            <input
              className="inputForm"
              type="email"
              value={input.email}
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Correo Electrónico"
              autoComplete="off"
            />
            <input
              className="inputForm"
              type="password"
              onChange={(e) => {
                handleChange(e);
              }}
              value={input.contraseña}
              name="contraseña"
              placeholder="Contraseña"
            />
            <input
              className="inputForm"
              type="password"
              name="contraseña2"
              placeholder="Repita su contraseña"
            />
            <input
              className="inputForm"
              type="text"
              value={input.dni}
              name="dni"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="DNI (sin puntos ni comas)"
              autoComplete="off"
            />
            <input
              className="inputForm"
              type="date"
              value={input.fechaDeNacimiento}
              name="fechaDeNacimiento"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Fecha de nacimiento"
              autoComplete="off"
            />
            <input
              className="inputForm"
              type="text"
              value={input.direccion}
              name="direccion"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Dirección"
              autoComplete="off"
            />
            <input
              className="inputForm"
              type="tel"
              value={input.numeroDeContacto}
              name="numeroDeContacto"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Contacto"
              autoComplete="off"
            />
            {/* <section id="whatsapp_checkbox">
              <input
                id="whatsapp"
                type="checkbox"
                value={input.consentimientoWhatsapp}
                name="consentimientoWhatsapp"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label>Quiero ingresar al grupo de WhatsApp</label>
            </section> */}
            <br />
            <button className="userButton" type="submit">
              REGISTRARME
            </button>
          </form>
          <section id="navigateToLogin">
            <span>
              ¿Ya tenés un usuario?
              <Link to="/login">
                <p>Inicia sesión aquí</p>
              </Link>
            </span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Registro;
