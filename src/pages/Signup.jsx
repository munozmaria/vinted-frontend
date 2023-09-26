import { useState } from "react";
import axios from "axios";
import {apiUrl} from "../apiConfig";

import Dropzone from "react-dropzone";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faX, faCamera } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash, faX, faCamera);

const Signup = ({ handleToken, handleCloseModals, switchModals }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hashPassword, setHashPassword] = useState(true);
  const [confirmHashPassword, setConfirmHashPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkNewsletter, setNewsletter] = useState(false);
  const [identiques, setIdentiques] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("");
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("username", name);
      formData.append("newsletter", checkNewsletter);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        `${apiUrl}/user/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );



   
      //console.log(response.data);


      if(response?.data?.token){
        
        handleToken(response.data.token, response.data._id);
        navigate("/");
        handleCloseModals(true)
      }

    } catch (error) {
      if(error.message) {

        if (error.response.data.message === "This email already has an account") {
          // Je met à jour mon state errorMessage
          setErrorMessage(
            "Ce mail est déjà utilisé, veuillez en choisir un autre :)"
          );
        } else if (error.response.data.message === "Missing parameters") {
          setErrorMessage("Veuillez remplir tous les champs :)");
        }


      }else {
      
        console.error(error);
      }
    }
  };


  const onDrop = (acceptedFiles) => {
   
    if (acceptedFiles.length > 0) {
      setAvatar(acceptedFiles[0]);
      setAvatarUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  return (
    <div className="formulaire">
      <i
        className="closeModal"
        onClick={() => {
          handleCloseModals()
        }}>
        <FontAwesomeIcon icon={faX} />
      </i>
      <div className="formContainer">
    
        <form
          onSubmit={(event) => {
            handleSignup(event);
          }}>
          <h1>S'inscrire</h1>
          {!avatar ? (
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="userAvatar dropzone">
                <input {...getInputProps()} />
                <p className="choose">Choose your avatar</p>
                <FontAwesomeIcon className="faCamera" icon={faCamera} />
              </div>
            )}
          </Dropzone>
        ) : (
          <div className="userAvatar">
            <img src={avatarUrl} alt="profile" />
          </div>
        )}
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <p onClick={switchModals}>Tu as déjà un compte ? Connectes-toi !</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
