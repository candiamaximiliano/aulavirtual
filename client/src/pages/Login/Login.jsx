import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../../redux/actions/auth";
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

  // useEffect(() => {
  //   navigate("/profile");

  //   return () => {
  //     navigate("/login");
  //   };
  // }, [isLoggedIn, navigate]);

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <Input
              type="text"
              className="form-control"
              name="usuario"
              value={usuario}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <Input
              type="password"
              className="form-control"
              name="contraseña"
              value={contraseña}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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
