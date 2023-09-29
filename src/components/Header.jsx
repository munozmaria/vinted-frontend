import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
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
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

library.add(
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faRightFromBracket,
  faPlus,
  faBars,
  faUser
);

const Header = ({
  token,
  dataId,
  handleToken,
  productDetailsSearch,
  setProductDetailsSearch,
  handleSingupButton,
  handleLoginButton,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const modalRef = useRef(null);

  const openMenu = () => {
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const handleImageClick = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        //console.log('holaa')
        closeMenu();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <img src={logo} alt="" onClick={handleImageClick} />

        <div className="recherche">
          <FontAwesomeIcon className="magnifyGlass" icon={faMagnifyingGlass} />
          <input
            type="text"
            value={productDetailsSearch}
            placeholder="Rechercher des articles"
            onChange={(event) => {
              //console.log(event.target.value)
              setProductDetailsSearch(event.target.value);
            }}
          />
        </div>

        <button className="menu-button bigscreen" onClick={openMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          <div ref={modalRef} className="menuContainer">
            {!token ? (
              <div className="buttons">
                <button
                  onClick={handleSingupButton}
                  className="button-signup btn">
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
                    className="button-logout btn"
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
                <button className="button-shop btn">
                  <span className="button-text">Vendre</span>
                  <span className="button-icon">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </button>
              </Link>
            </div>
            {token ? (
              <div>
                <Link to={`/profil/${dataId}`}>
                  <button className="button-shop btn">
                    <span className="button-text">Profile</span>
                    <span className="button-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
