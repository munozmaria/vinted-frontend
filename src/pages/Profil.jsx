import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../apiConfig";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPencilAlt,
  faSave,
  faCamera,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
library.add(faPencilAlt, faSave, faCamera, faCheck);

const Profil = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const { id } = useParams();
  //console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        try {
          const response = await axios.get(`${apiUrl}/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          //console.log(response);
          setData(response.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      }
    };
    fetchData();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append("username", data.account.username);
      formData.append("email", data.email);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await axios.put(
        `${apiUrl}/user/modify/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setIsEditing(false);
      setData(response.data.authenticatedUser);
      toast.success(`Votre profil a été modifié`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        style: { color: "#2baeb7" },
        progressStyle: { backgroundColor: "#2baeb7" },
        icon: (
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "#2baeb7", fontSize: "1.5em" }} 
          />
        ),
      });
      if (avatar) {
        setAvatarUrl(URL.createObjectURL(avatar));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      console.log("Accepted files:", acceptedFiles);
      setAvatar(acceptedFiles[0]);
      setAvatarUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <div className="profil">
      <div className="profil-header">
        <h1>
          Profil de{" "}
          <span style={{ fontWeight: "bold", color: "#2BAEB7" }}>
            {data.account.username}
          </span>{" "}
        </h1>
        {!isEditing && (
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={handleEditClick}
            className="edit-icon"
          />
        )}
      </div>
      <div className="profil-info">
        <div className="profil-image">
          {!avatarUrl && isEditing ? (
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="userAvatar dropzone">
                  <input {...getInputProps()} />

                  <FontAwesomeIcon className="faCamera" icon={faCamera} />
                </div>
              )}
            </Dropzone>
          ) : (
            <div>
              <img src={avatarUrl || data.account.avatar} alt="profile" />
            </div>
          )}
        </div>
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={data.account.username}
              onChange={(e) =>
                setData({
                  ...data,
                  account: { ...data.account, username: e.target.value },
                })
              }
            />
            <input
              type="text"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <button onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faSave} /> Enregistrez
            </button>
          </div>
        ) : (
          <div className="profil-data">
            <p>
              Nom:{" "}
              <span style={{ color: "#2BAEB7" }}>{data.account.username}</span>
            </p>
            <p>
              Email: <span style={{ color: "#2BAEB7" }}>{data.email}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;
