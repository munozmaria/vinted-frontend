import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faMagnifyingGlass,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import RangeRate from "./RangeRate";
import SwitchPrice from "./SwitchPrice";

library.add(faEye, faEyeSlash, faMagnifyingGlass);

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  setRangePriceOffers,
  setSortedPrice,
  sortedPrice,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
          {currentPath === "/" && (
            <div>
              <SwitchPrice
                setSortedPrice={setSortedPrice}
                sortedPrice={sortedPrice}></SwitchPrice>
              <RangeRate setRangePriceOffers={setRangePriceOffers}></RangeRate>
            </div>
          )}
        </div>

        {!token ? (
          <div>
            <Link to="/signup">
              {" "}
              <button className="button-signup"> S'inscrire</button>
            </Link>

            <Link to="/login">
              <button className="button-login">Se connecter</button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/">
              <button
                className="button-logout"
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
            <button className="button-shop">Vends tes articles</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
