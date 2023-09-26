import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faMagnifyingGlass,
  faEyeSlash,
  faRightFromBracket,
  faPlus,
  faBars,
 
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

library.add(
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faRightFromBracket,
  faPlus,
  faBars
);

const Header = ({
  token,
  handleToken,
  search,
  setSearch,

  sortedPrice,
  handleSingupButton,
  handleLoginButton,
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="container">
        <img
          src={logo}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />

<div className="recherche">
          <FontAwesomeIcon className="magnifyGlass" icon={faMagnifyingGlass} />
          <input
            type="text"
            value={search}
            placeholder="Rechercher des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        {/* Botón de hamburguesa solo visible en pantallas pequeñas */}
        <button className="menu-button bigscreen" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <div className="menuContainer">
            {!token ? (
              <div className="buttons">
                <button onClick={handleSingupButton} className="button-signup">
                  S'inscrire
                </button>
                <button onClick={handleLoginButton} className="button-login">
                  Se connecter
                </button>
              </div>
            ) : (
              <div>
                <Link to="/">
                  <button
                    className="button-logout"
                    onClick={() => {
                      handleToken(null, null);
                    }}>
                    <span className="button-text">Se déconnecter</span>
                    <span className="button-icon">
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </span>
                  </button>
                </Link>
              </div>
            )}

            <div>
              <Link to="/publish">
                <button className="button-shop">
                  <span className="button-text">Vends tes articles</span>
                  <span className="button-icon">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
