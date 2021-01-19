import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";
import logo from "../../assets/icons/logo.svg";

export default function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-container__sub">
        <nav className="nav-container__nav">
          <div className="nav-container__logo-container">
            <Link className="nav-container__logo-link" to="/">
              <img className="nav-container__logo" src={logo} alt="logo"></img>
            </Link>
          </div>
          <div className="nav-container__menu-container">
            <ul
              className="nav-container__list
                 nav-container__list-hide"
            >
              <Link className="nav-container__list-item-link" to="/">
                <li className="nav-container__list-item">Home</li>
              </Link>
              <Link className="nav-container__list-item-link" to="/map">
                <li className="nav-container__list-item">Map</li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
