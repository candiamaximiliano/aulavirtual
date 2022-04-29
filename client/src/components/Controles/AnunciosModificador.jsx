import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getAnuncios, putAnuncios } from "../../redux/actions/profesorado";
import style from "./Modificadores.module.css";
import accesoDenegado from "../../images/error/403.png";

export const AnunciosModificador = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAnuncios());
  }, [dispatch]);

  const anuncios = useSelector((state) => state.profesorado.anuncios);

  let anuncioFiltrado = anuncios.find((anuncio) => {
    return Number(anuncio.id) === Number(id);
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    base64: anuncioFiltrado.base64,
    titulo: anuncioFiltrado.titulo,
    subtitulo: anuncioFiltrado.subtitulo,
    url: anuncioFiltrado.url,
    texto: anuncioFiltrado.texto,
    recursos: anuncioFiltrado.recursos,
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
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
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
    if (input.nombre && input.url) {
      dispatch(putAnuncios(id, input));
      setSuccess(true);
      // alert("Clase subida correctamente");
      setErrors("");
      setInput({
        base64: anuncioFiltrado.base64,
        titulo: anuncioFiltrado.titulo,
        subtitulo: anuncioFiltrado.subtitulo,
        url: anuncioFiltrado.url,
        texto: anuncioFiltrado.texto,
        recursos: anuncioFiltrado.recursos,
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
          <h1>Modificar clase: {anuncioFiltrado?.titulo}</h1>
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
                value={input.nombre}
                name="titulo"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder={anuncioFiltrado.titulo}
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.url}
                name="subtitulo"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                placeholder={anuncioFiltrado.subtitulo}
                autoComplete="off"
              ></input>
            </div>
            <div className={style.groupForm}>
              <input
                className={style.input}
                type="text"
                value={input.profesores}
                name="url"
                placeholder={anuncioFiltrado.url}
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
                value={input.profesores}
                name="texto"
                placeholder={anuncioFiltrado.texto}
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
                placeholder={anuncioFiltrado.recursos}
                autoComplete="off"
              ></input>
            </div>
            <div>
              <button className={style.buttonForm} type="submit">
                Actualizar Anuncio
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
