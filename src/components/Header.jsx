import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpg";

const Header = ({ token, handleToken }) => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="" />

        <div>
          <input type="text" placeholder="recherche des articles" />
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
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
