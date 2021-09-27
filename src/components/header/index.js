import React from "react";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">Martin List Syberg </h1>
      <ul className="navbar">
        <li>
          <a href="home">Home</a>
        </li>
        <li>
          <a href="oldprojects">Old Projects</a>
        </li>
        <li>
          <a href="contact">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
