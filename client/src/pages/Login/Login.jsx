import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../../redux/actions/auth";
import style from "./Login.module.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  // const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const onChangeUsername = (e) => {
    const usuario = e.target.value;
    setUsuario(usuario);
  };

  const onChangePassword = (e) => {
    const contraseña = e.target.value;
    setContraseña(contraseña);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(usuario, contraseña))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
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
          />
        </div>
        <Form className={style.formLayout} onSubmit={handleLogin} ref={form}>
          <div className={style.formGroup}>
            <Input
              type="text"
              className={style.formControl}
              name="usuario"
              value={usuario}
              onChange={onChangeUsername}
              validations={[required]}
              placeholder="Usuario"
            />
          </div>
          <div className={style.formGroup}>
            <Input
              type="password"
              className={style.formControl}
              name="contraseña"
              value={contraseña}
              onChange={onChangePassword}
              validations={[required]}
              placeholder="Contraseña"
            />
          </div>
          <div className={style.formGroup}>
            <button className={style.formButton} disabled={loading}>
              {loading && <span className={style.loading}></span>}
              <span>Iniciar Sesión</span>
            </button>
          </div>
          {message && (
            <div className={style.messageContainer}>
              <div className={style.message} role="alert">
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
export default Login;
