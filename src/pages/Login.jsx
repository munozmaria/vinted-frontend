import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import { apiUrl } from "../apiConfig";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash, faX);

const Login = ({ handleToken, handleCloseModals, switchModals }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hashPassword, setHashPassword] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, {
        email,
        password,
      });
      //console.log(response.data);

      handleToken(response.data.token, response.data._id);

      if (response.data.token) {
        navigate("/");
        handleCloseModals(true);
        toast.success(`Vous êtes connecté`);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Bad Request.");
      console.error(err);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    fetchData();
  };

  return (
    <>
      <div className="formulaire">
        <i
          className="closeModal"
          onClick={() => {
            //console.log("hzrzrzr")
            handleCloseModals();
          }}>
          <FontAwesomeIcon icon={faX} />
        </i>
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
            <p onClick={switchModals}>Pas encore de compte? Inscris-toi!</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
