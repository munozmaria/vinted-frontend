import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
library.add(faEye, faEyeSlash);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hashPassword, setHashPassword] = useState(true);

  //console.log(token);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/user/login`,
        {
          email: email,
          password: password,
        }
      );
      //console.log(response.data);
      const token = response.data.token;
      Cookies.set("token", token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //console.log(tokenLogin)

  const handleLogin = (event) => {
    event.preventDefault();

    fetchData();
  };

  return (
    <>
      <div className="formulaire">
        <div className="formContainer">
          <form onSubmit={handleLogin}>
            <h1>Se connecter</h1>

            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <div className="passwordInput">
              <input
                id="password"
                type={hashPassword ? "password" : "text"}
                value={password}
                placeholder="Mot de passe"
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <FontAwesomeIcon
                className="eyeIcon"
                icon={hashPassword ? "eye" : "eye-slash"}
                onClick={() => {
                  setHashPassword(!hashPassword);
                }}
              />
            </div>

            <button type="submit">Se connecter</button>
            <p>Pas encore de compte? Inscris-toi!</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
