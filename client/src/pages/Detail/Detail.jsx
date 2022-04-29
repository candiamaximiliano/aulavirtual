import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAnuncios } from "../../redux/actions/profesorado";
import detailStyles from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();

  //Una vez montado el componente traigo todas las recetas:
  useEffect(() => {
    dispatch(getAnuncios());
  }, []);

  //Me traigo todo el estado recipes
  const allAnuncios = useSelector((state) => state.profesorado.anuncios);

  const { id } = useParams();
  console.log(id);
  console.log(allAnuncios);
  const anuncioSeleccionado = allAnuncios?.find((anuncio) => {
    return Number(anuncio.id) === Number(id);
  });
  console.log("filter " + anuncioSeleccionado);

  return (
    <div className={detailStyles.detailContainer}>
      {/* <img src={anuncioSeleccionado.base64} alt="anuncio" /> */}
      <h1>{anuncioSeleccionado.titulo}</h1>
      <h3>{anuncioSeleccionado.subtitulo}</h3>
      <p>{anuncioSeleccionado.texto}</p>
      <a href={anuncioSeleccionado.url}>{anuncioSeleccionado.url}</a>
      <ul>
        {anuncioSeleccionado.recursos?.map((recurso) => {
          return (
            <li>
              <a href={recurso}>recurso</a>
            </li>
          );
        })}
      </ul>
      <div className={detailStyles.goBackContainer}>
        <Link to="/home">
          <span className={detailStyles.goBack}>Go back</span>
        </Link>
      </div>
    </div>
  );
}
