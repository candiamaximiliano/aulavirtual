import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";
import Styles from "./Anuncios.module.css";
import Card from "../../components/Card/Card";
import { getAnuncios } from "../../redux/actions/profesorado";

const Anuncios = () => {
  const dispatch = useDispatch();

  //Una vez montado el componente traigo todas las recetas:
  useEffect(() => {
    dispatch(getAnuncios());
  }, []);

  //Me traigo todo el estado recipes
  const allAnuncios = useSelector((state) => state.profesorado.anuncios);

  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.cardsContainer}>
        {allAnuncios?.map((anuncio, index) => {
          return (
            <Link
              className={Styles.cardsLink}
              key={index}
              to={"/anuncios/" + anuncio.id}
            >
              <Card
                key={anuncio.id}
                id={anuncio.id}
                titulo={anuncio.titulo}
                base64={anuncio.base64}
                subtitulo={anuncio.subtitulo}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Anuncios;
