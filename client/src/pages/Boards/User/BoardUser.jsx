import React, { useState, useEffect } from "react";
import UserService from "../../../services/user.service";
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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};
export default BoardUser;
