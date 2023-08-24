import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

//cuando cambio de pagina siempre hago una requete axios, osea en cada pagina tendre una requete avec el useEffect, no hacerlo todo en la app

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        //console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [id]); //lo pongo ahi por si acaso cambia el id y esto hace que la variable id cambie de valor se vuelva a actualizar la requete.El id no lo reconoce el useEffect por eso es importante que cuando le meto dentro variables al useEffect se lo ponga como argumento por si el valor de la variable cambia

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <div className="offre">
      <article>
        <div>
          <img src={data.product_image.secure_url} alt={data.product_name} />
        </div>
        <div>
          <p>{data.owner.account.username}</p>
        </div>
        <div>
          <p>{data.product_price}€</p>
          <p>{data.product_name}</p>
        </div>
        <div>
          {data.product_details.map((detail, index) => {
            const keys = Object.keys(detail);
            const key = keys[0];

            return (
              <p key={index}>
                {key}: {detail[key]}
              </p>
            ); //lo hago asi porque no puedo escribir a la mano MARQUE, Etat etc como en el home por eso necesito el object keys para encontrar la llave del objeto
          })}
        </div>
      </article>
    </div>
  );
};

export default Offer;
