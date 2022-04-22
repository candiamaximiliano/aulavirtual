import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../../redux/actions/auth";
import style from "./Registro.module.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusuario = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vcontraseña = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vfotoDePerfil = (value) => {
  if (value.length < 6 || value.length > 200) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vnombre = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vapellido = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vdni = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vfechaDeNacimiento = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vdireccion = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vnumeroDeContacto = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [input, setInput] = useState({
    fotoDePerfil: "",
    base64: "",
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    contraseña: "",
    dni: "",
    fechaDeNacimiento: "",
    direccion: "",
    numeroDeContacto: "",
    consentimientoWhatsapp: false,
    instructorado: false,
    especializacion: false,
    profesorado: false,
  });

  const [base64, setBase64] = useState("");

  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    showFile();
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        consentimientoWhatsapp: true,
      });
    } else {
      setInput({
        ...input,
        consentimientoWhatsapp: false,
      });
    }
  };

  const imgProfile = useRef();

  /* if (window.File && window.FileReader && window.FileList && window.Blob) { */
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
      setBase64(base64[1]);
    }, 1000);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    let base = base64;
    setInput({
      ...input,
      base64: base,
    });
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(input))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    if (successful) {
      navigate("/login");
      setInput({
        fotoDePerfil: "",
        base64: "",
        nombre: "",
        apellido: "",
        usuario: "",
        email: "",
        contraseña: "",
        dni: "",
        fechaDeNacimiento: "",
        direccion: "",
        numeroDeContacto: "",
        consentimientoWhatsapp: false,
        instructorado: false,
        especializacion: false,
        profesorado: false,
      });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.subContainer}>
        <div className={style.profileContainer}>
          <img
            src="https://thumbs4.imagebam.com/6c/a5/f0/ME9I39H_t.png"
            alt="logo512.png"
            className={style.profileImage}
            ref={imgProfile}
          />
        </div>
        <Form className={style.formLayout} onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div className={style.div}>
              <div className={style.formGroup}>
                <Input
                  type="file"
                  // accept="image/x-png,image/jpeg"
                  className={style.formControl}
                  name="fotoDePerfil"
                  value={input.fotoDePerfil}
                  onChange={handleOnChange}
                  validations={[required, vfotoDePerfil]}
                  placeholder="Foto de perfil"
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="text"
                  className={style.formControl}
                  name="nombre"
                  value={input.nombre}
                  onChange={handleOnChange}
                  validations={[required, vnombre]}
                  placeholder="Nombre"
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="text"
                  className={style.formControl}
                  name="apellido"
                  value={input.apellido}
                  onChange={handleOnChange}
                  validations={[required, vapellido]}
                  placeholder="Apellido"
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="text"
                  className={style.formControl}
                  name="usuario"
                  value={input.usuario}
                  onChange={handleOnChange}
                  validations={[required, vusuario]}
                  placeholder="Usuario"
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="email"
                  className={style.formControl}
                  name="email"
                  value={input.email}
                  onChange={handleOnChange}
                  validations={[required, validEmail]}
                  placeholder="E-mail"
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="password"
                  className={style.formControl}
                  name="contraseña"
                  value={input.contraseña}
                  onChange={handleOnChange}
                  validations={[required, vcontraseña]}
                  placeholder="Contraseña"
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="number"
                  className={style.formControl}
                  name="dni"
                  value={input.dni}
                  onChange={handleOnChange}
                  validations={[required, vdni]}
                  placeholder="DNI sin puntos ni letras"
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="date"
                  className={style.formControl}
                  name="fechaDeNacimiento"
                  value={input.fechaDeNacimiento}
                  onChange={handleOnChange}
                  validations={[required, vfechaDeNacimiento]}
                  placeholder="Fecha de nacimiento | DD/MM/AAAA"
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="text"
                  className={style.formControl}
                  name="direccion"
                  value={input.direccion}
                  onChange={handleOnChange}
                  validations={[required, vdireccion]}
                  placeholder='Dirección: ej. Rivadavia 1464 depto 3"C", Posadas, Misiones'
                />
              </div>
              <div className={style.formGroup}>
                <Input
                  type="text"
                  className={style.formControl}
                  name="numeroDeContacto"
                  value={input.numeroDeContacto}
                  onChange={handleOnChange}
                  validations={[required, vnumeroDeContacto]}
                  placeholder="Ingrese un número de contacto"
                />
              </div>
              <div className={style.checkGroup}>
                <input
                  type="checkbox"
                  // className="form-control"
                  name="consentimientoWhatsapp"
                  value={input.consentimientoWhatsapp}
                  onChange={handleCheck}
                  className={style.checkbox}
                />
                <label
                  className={style.checkLabel}
                  htmlFor="consentimientoWhatsapp"
                >
                  Quiero entrar al grupo de Whatsapp
                </label>
              </div>
              <div className={style.formGroup}>
                <button className={style.formButton}>REGISTRARME</button>
              </div>
            </div>
          )}
          {message && (
            <div className={style.formGroup}>
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Register;

// data:image/png;base64,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
