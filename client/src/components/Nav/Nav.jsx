import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo.svg";

const Nav = () => {
  return (
    <div className="headerContainer">
      <Link to={"/"}>
        <img src={Logo} alt="headerLogo" />
      </Link>
    </div>
  );
};

export default Nav;
