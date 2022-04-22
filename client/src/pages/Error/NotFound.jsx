import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../../images/error/404.png";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.NotFoundContainer}>
      <img className={styles.error404} src={NotFoundImage} alt="Not Found" />
      <Link className={styles.regresar} to="/">
        Regresar
      </Link>
    </div>
  );
};
