import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faMagnifyingGlass,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash, faMagnifyingGlass);

const Header = ({ token, handleToken, search, setSearch }) => {
  const navigate = useNavigate();

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

            <div>
              <span></span>
              <span></span>
              <div></div>
            </div>


        </div>

        {!token ? (
          <div>
            <Link to="/signup">
              {" "}
              <button>S'inscrire</button>
            </Link>

            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/">
              <button
                onClick={() => {
                  handleToken(null);
                }}>
                Se déconnecter
              </button>
            </Link>
          </div>
        )}

        <div>
          <Link to="/publish">
            <button>Vends tes articles</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
