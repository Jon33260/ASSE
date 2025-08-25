import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="navbar">
      {/* Menu burger */}
      <button
        type="button"
        className="burger-nav"
        onClick={() => setShowLinks(!showLinks)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Logo */}
      <NavLink to="/" className="logo">
        <img src={logo} alt="Mon logo" />
      </NavLink>

      {/* Liens */}
      <ul className={`link-nav ${showLinks ? "show" : ""}`}>
        <li>
          <NavLink
            to="/accueil"
            className="nav-item"
            onClick={() => setShowLinks(false)}
          >
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profil"
            className="nav-item"
            onClick={() => setShowLinks(false)}
          >
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/connexion"
            className="btn-connexion"
            onClick={() => setShowLinks(false)}
          >
            Connexion
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
