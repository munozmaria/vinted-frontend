import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
library.add(faEye, faEyeSlash);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hashPassword, setHashPassword] = useState(true);
  const [confirmHashPassword, setConfirmHashPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkNewsletter, setNewsletter] = useState(false);
  const [identiques, setIdentiques] = useState(true);

  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();

    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      setIdentiques(!identiques);
    } else {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/user/signup`,
        {
            email: email,
            username: name,
          password: password,
          newsletter: checkNewsletter,
        }
      );
      //console.log(response.data);
      const token = response.data.token;
      //console.log(token);
      Cookies.set("token", token, { expires: 7 });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="formulaire">
      <div className="formContainer">
        <form
          onSubmit={(event) => {
            handleSignup(event);
            navigate("/login");
          }}>
          <h1>S'inscrire</h1>

          <input
            id="name"
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <input
            id="email"
            value={email}
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <div className="passwordInput">
            <input
              id="password"
              className={identiques ? "" : "wrong"}
              type={hashPassword ? "password" : "text"}
              value={password}
              placeholder="Confirmez mot de passe"
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

          <div className="passwordInput">
            <input
              id="confirmPassword"
              className={identiques ? "" : "wrong"}
              type={confirmHashPassword ? "password" : "text"}
              value={confirmPassword}
              placeholder="Mot de passe"
              name="password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <FontAwesomeIcon
              className="eyeIcon"
              icon={confirmHashPassword ? "eye" : "eye-slash"}
              onClick={() => {
                setConfirmHashPassword(!confirmHashPassword);
              }}
            />
          </div>
          {identiques === false && (
            <span style={{ color: "red" }}>
              Les mots de passe ne sont pas indentiques
            </span>
          )}
          <div
            className="checkbox-container"
            onChange={(event) => {
              setNewsletter(event.target.checked);
            }}>
            <div>
              <input
                type="checkbox"
                className="check"
                value={checkNewsletter}
              />
              <span>S'inscrire à notre newsletter</span>
            </div>

            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &amp;
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>

          <button type="submit">S'inscrire</button>
          <p>Tu as déjà un compte ? Connecte-toi !</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
