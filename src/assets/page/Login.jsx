import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
library.add(faEye, faEyeSlash);

const Login = () => {
  const [password, setPassword] = useState("");
  const [hashPassword, setHashPassword] = useState(true);
  const [confirmHashPassword, setConfirmHashPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [identiques, setIdentiques] = useState(true);

  const handleLogin = (event) => {
    event.preventDefault();

    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      setIdentiques(!identiques);
    } else {
      alert("puedes");
    }
  };

  return (
    <>
      <div className="formSignup">
        <div className="formContainer">
          <form onSubmit={handleLogin}>
            <h1>Se connecter</h1>

            <input id="email" type="email" placeholder="Email" name="email" />

            <div className="passwordInput">
              <input
                id="password"
                className={identiques ? "" : "wrong"}
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

            <div className="passwordInput">
              <input
                id="confirmPassword"
                className={identiques ? "" : "wrong"}
                type={confirmHashPassword ? "password" : "text"}
                value={confirmPassword}
                placeholder="Confirmez mot de passe"
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

            <button type="submit">Se connecter</button>
            <p>Pas encore de compte? Inscris-toi!</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
