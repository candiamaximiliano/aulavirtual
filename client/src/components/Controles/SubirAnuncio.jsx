import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAnuncios, postAnuncios } from "../../redux/actions/profesorado";
import style from "./SubirClase.module.css";
import accesoDenegado from "../../images/error/403.png";

export const SubirAnuncio = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const anuncios = useSelector((state) => state.profesorado.anuncios);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    base64: "",
    titulo: "",
    subtitulo: "",
    url: "",
    texto: "",
    recursos: "",
  });

  const handleOnSelect = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      curso: e.target.value,
    });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    showFile();
  };

  const imgProfile = useRef();

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
      setInput({
        ...input,
        base64: base64[1],
      });
    }, 1000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.base64 && input.titulo) {
      dispatch(postAnuncios(input));
      setSuccess(true);
      // alert("Clase subida correctamente");
      setErrors("");
      setInput({
        base64: "",
        titulo: "",
        subtitulo: "",
        url: "",
        texto: "",
        recursos: "",
      });
    } else {
      alert("DATA REQUIRED");
      setSuccess(false);
    }
  };

  useEffect(() => {
    dispatch(getAnuncios());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {currentUser.roles[1] === "ROLE_ADMIN" ? (
        <div className={style.subContainer}>
          <img
            className={style.profileImage}
            src={"data:image/png;base64," + currentUser.base64}
            alt="foto de perfil"
            ref={imgProfile}
          />
          <form
            className={style.form}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="file"
              // accept="image/x-png,image/jpeg"
              className={style.formControlImage}
              name="fotoDePerfil"
              value={input.fotoDePerfil}
              onChange={handleOnChange}
              placeholder="Foto de perfil"
            />
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.titulo}
                name="titulo"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder="Titulo"
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.subtitulo}
                name="subtitulo"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder="Subtitulo"
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.url}
                name="url"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder="Url"
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.texto}
                name="texto"
                placeholder="Texto"
                autoComplete="off"
                onChange={(e) => {
                  handleOnChange(e);
                }}
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.recursos}
                name="recursos"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder="Recursos asociados al anuncio"
                autoComplete="off"
              ></input>
            </div>
            <div>
              <button className={style.buttonForm} type="submit">
                Subir Anuncio
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <img
            className={style.error403}
            src={accesoDenegado}
            alt="acceso denegado"
          />
          <Link className={style.regresar} to="/">
            Regresar
          </Link>
        </div>
      )}
    </div>
  );
};
