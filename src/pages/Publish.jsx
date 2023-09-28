import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {  useNavigate } from "react-router-dom";
import {apiUrl} from "../apiConfig";


library.add(faPlus);

const Publish = ({ token, setLoginModal }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);
  const [, setImgFromCloudinary] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/")
      setLoginModal(true)
      document.body.style.overflow = 'hidden';
    }
  }, [setLoginModal, token, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);

      const response = await axios.post(
        `${apiUrl}/offer/publish`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImgFromCloudinary(response.data.product_image.secure_url);
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez réssayer");
      }
      //console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div className="publish-container">
    <div className="publish">
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit}>
        <div className="picture-section">
          <div className="selectPicture">
            <label htmlFor="file" className="label-file">
             
              <span>Photo</span>
            </label>
            <input
              className="input-file"
              id="file"
              type="file"
              onChange={(event) => {
                // console.log(event);
                setPicture(event.target.files[0]);
              }}
            />
          </div>
          {picture && (
            <img
              className="picture-before-post"
              src={URL.createObjectURL(picture)}
              alt="product before post"></img>
          )}
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <h4>Titre</h4>
            <input
              type="text"
              id="title"
              value={title}
              placeholder="ex: Chemise Sézane verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Décris ton article</h4>
            <textarea
              type="text"
              rows="5"
              placeholder="ex: porté quelquefois, taille correctement"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}>
              {" "}
            </textarea>
          </div>
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <h4>Marque</h4>
            <input
              type="text"
              id="selectedBrand"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Taille</h4>
            <input
              type="text"
              value={size}
              placeholder="ex: L / 40 / 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Couleur</h4>
            <input
              type="text"
              value={color}
              placeholder="ex: Fushia"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Etat</h4>
            <input
              type="text"
              placeholder="Neuf avec étiquette"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div className="text-input">
            <h4>Lieu</h4>
            <input
              type="text"
              value={city}
              placeholder="ex: Paris"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <h4>Prix</h4>
            <div className="checkbox-section">
              <input
                type="text"
                id="price"
                value={price}
                placeholder="0,00 €"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <div className="checkbox-input">
                <label htmlFor="exchange" className="checkbox-design"></label>
                <input
                  className="check-input"
                  type="checkbox"
                  name="exchange"
                  id="exchange"
                  value={exchange}
                  onClick={() => {
                    setExchange(!exchange);
                  }}
                />
                <span>Je suis intéressé(e) par les échanges</span>
              </div>
            </div>
          </div>
        </div>
        <div className="submit-button-div">
          <button className="button-form-validation" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
    </div>
  ) : (
    <p>hello</p>
  );
};

export default Publish;
