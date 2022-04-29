import React from "react";
import cardStyles from "../Card/Card.module.css";

export default function Card({ base64, id, titulo, subtitulo }) {
  return (
    <div key={id} className={cardStyles.container}>
      <div className={cardStyles.imageContainer}>
        <img
          className={cardStyles.image}
          src={base64}
          alt="content not found"
        />
      </div>
      <h3 className={cardStyles.titulo}>{titulo}</h3>
      <h5 className={cardStyles.subtitulo}>{subtitulo}</h5>
    </div>
  );
}
