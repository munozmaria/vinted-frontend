import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);

const Publish = () => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const[wearRate, setWearRate] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState("")
  const[exchange, setExchange] = useState(false)
  

  return (
    <div className="publish">
      <h2>Vends ton article</h2>
      <div className="picture-section">
        <div className="selectPicture">
          <label htmlFor="file" className="label-file">
            <FontAwesomeIcon icon={faPlus} />
            <span>Ajoute une photo</span>
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
            id="description"
            rows="5"
            placeholder="ex: porté quelquefois, taille correctement"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          > </textarea>
        </div>
      </div>
      <div className="text-input-section">
        <div className="text-input">
            <h4>Marque</h4>
            <input type="text" id="selectedBrand" placeholder="ex: Zara" value={brand} onChange={(event) => {
              setBrand(event.target.value);
            }} />
        </div>
        <div className="text-input">
            <h4>Taille</h4>
            <input type="text" value={size} placeholder="ex: L / 40 / 12" onChange={(event) => {
              setSize(event.target.value);
            }} />
        </div>
        <div className="text-input">
            <h4>Couleur</h4>
            <input type="text" value={color} placeholder="ex: Fushia" onChange={(event) => {
              setColor(event.target.value);
            }} />
        </div>
        <div className="text-input">
            <h4>Etat</h4>
            <input type="text" placeholder="Neuf avec étiquette" value={wearRate} onChange={(event) => {
              setWearRate(event.target.value);
            }} />
        </div>
        <div className="text-input">
            <h4>Lieu</h4>
            <input type="text" value={city} placeholder="ex: Paris" onChange={(event) => {
              setCity(event.target.value);
            }} />
        </div>

      </div>
      <div className="text-input-section">
      <div className="text-input">
      <h4>Prix</h4>
      <div className="checkbox-section">

      
      <input type="text" id="price" value={price} placeholder="0,00 €" onChange={(event) => {
              setPrice(event.target.value);
            }} />
            <div className="checkbox-input">
            <label htmlFor="exchange" className="checkbox-design"></label>
            <input className="check-input" type="checkbox" name="exchange" id="exchange" value={exchange} onClick={()=>{
                setExchange(!exchange)
            }}/>
            <span>Je suis intéressé(e) par les échanges</span>
            </div>
            </div>
      </div>
      </div>
      <div className="submit-button-div"><button className="button-form-validation" type="submit">Ajouter</button></div>
      
    </div>
  );
};

export default Publish;
