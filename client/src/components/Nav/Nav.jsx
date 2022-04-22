import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../../redux/actions/auth";
import { clearMessage } from "../../redux/actions/message";
import { history } from "../../helpers/history";
import logo from "../../images/logo/Logotipo.png";
import style from "./Nav.module.css";
import logoutsvg from "../../images/navbar/logout_white_24dp.svg";
import accountCircle from "../../images/navbar/accountCircle.png";

export const Nav = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav className={style.navbar}>
        <div className={style.navbarBrandContainer}>
          <Link to={"/anuncios"} className={style.navbarBrandLink}>
            <img
              className={style.navbarBrand}
              src={logo}
              alt="foto de perfil"
            />
          </Link>
        </div>
        <div className={style.navbarItems}>
          <li className={style.navItem}>
            <Link to={"/anuncios"} className={style.navLink}>
              Anuncios
            </Link>
          </li>
          {showModeratorBoard && (
            <li className={style.navItem}>
              <Link to={"/mod"} className={style.navLink}>
                Profesor
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className={style.navItem}>
              <Link to={"/admin"} className={style.navLink}>
                Admin
              </Link>
            </li>
          )}
          {currentUser && (
            <li className={style.navItem}>
              <Link to={"/cursos"} className={style.navLink}>
                Cursos
              </Link>
            </li>
          )}
        </div>
        <div></div>
        {currentUser ? (
          <div className={style.navbarUser}>
            <li className={style.navItem}>
              <Link to={"/profile"} className={style.navLink}>
                <img
                  className={style.accountCircle}
                  src={
                    currentUser
                      ? "data:image/png;base64," + currentUser.base64
                      : accountCircle
                  }
                  alt="account"
                />
                {`${currentUser.nombre} ${currentUser.apellido}`}
              </Link>
            </li>
            <li className={style.navItem}>
              <a href="/login" className="nav-link" onClick={logOut}>
                <img src={logoutsvg} alt="logout" />
              </a>
            </li>
          </div>
        ) : (
          <div className={style.navbarUser}>
            <li className={style.navItem}>
              <Link to={"/login"} className={style.navLink}>
                INICIAR SESIÓN
              </Link>
            </li>
            <li className={style.navItem}>
              <Link to={"/register"} className={style.navLink}>
                REGISTRARME
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3"></div>
    </div>
  );
};
