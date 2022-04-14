import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// import { postContenido } from "../../redux/actions";
import Notification from "../Notificaciones/Notification";
import { postContenido } from "../../redux/actions";

const SubirContenido = ({ errorMessage, setErrorMessage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    nombre_curso: "",
    nombre_materia: "",
    nombre_clase: "",
    url_clase: "",
  });

  const handlerSignUp = (e) => {
    e.preventDefault();
    dispatch(postContenido(input));
    alert("Recurso subido correctamente");
    setInput({
      nombre_curso: "",
      nombre_materia: "",
      nombre_clase: "",
      url_clase: "",
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
    <div>
      <div>
        <div>
          <h3>SUBIR CONTENIDO</h3>
          <Notification message={errorMessage} />
          <form onSubmit={handlerSignUp}>
            <input
              type="text"
              value={input.nombre_curso}
              name="nombre_curso"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Selecciona un curso"
              autoComplete="off"
            />
            <input
              type="text"
              value={input.nombre_materia}
              name="nombre_materia"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Materia"
              autoComplete="off"
            />
            <input
              type="text"
              value={input.nombre_clase}
              name="nombre_clase"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Clase"
              autoComplete="off"
            />
            <input
              type="text"
              value={input.url_clase}
              name="url_clase"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="URL"
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
            <button type="submit">SUBIR CLASE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubirContenido;
