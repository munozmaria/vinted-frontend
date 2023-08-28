import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.jpg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faMagnifyingGlass,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
library.add(faEye, faEyeSlash, faMagnifyingGlass);

const Header = ({ token, handleToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://lereacteur-vinted-api.herokuapp.com/offers`;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url); //console.log(response.data);
        setData(response.data.offers);
        setIsLoading(false);
       
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
 

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <header>
      <div className="container">
        <img   src={logo} alt="" onClick={() => {
          navigate("/");
        }}/>

        <div className="recherche">
          <FontAwesomeIcon className="magnifyGlass" icon={faMagnifyingGlass} />
          <input type="text" placeholder="Recherche des articles" />
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
