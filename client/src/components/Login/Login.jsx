import React, { useState } from "react";
import { handlerLogin } from "../../handlers/handlers";
import "./Login.css";
import image from "../../images/adrian-anita_example.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="loginForm">
      <div className="leftContainer">
        <h3>AULA VIRTUAL</h3>
        <form onSubmit={handlerLogin}>
          <input
            type="text"
            value={username}
            name="Username"
            placeholder="Usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            value={password}
            name="Password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button>ACCEDER</button>
        </form>
      </div>
      <div className="rightContainer">
        <img src={image} alt="login" />
      </div>
    </div>
  );
};

export default Login;
