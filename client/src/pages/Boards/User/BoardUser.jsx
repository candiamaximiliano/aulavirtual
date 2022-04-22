import React, { useState, useEffect } from "react";
import { Cursos } from "../../../components/Cursos/Cursos";
import UserService from "../../../services/user.service";
import style from "../Boards.module.css";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    let cancel = false;
    UserService.getUserBoard().then(
      (response) => {
        if (cancel) return;
        setContent(response.data);
      },
      (error) => {
        if (cancel) return;
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div className={style.container}>
      <Cursos />
    </div>
  );
};
export default BoardUser;
