import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        //console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <div className="offre">
      <article>
        <div>
          <img src={data.product_image.secure_url} alt={data.product_name} />
        </div>
        <div className="offre-details">
          <p className="offer-price">{data.product_price}€</p>

          <div className="offer-list-data">
            {data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              const key = keys[0];

              return (
                <li>
                  {" "}
                  <span key={index}>{key}:</span>
                  <span>{detail[key]}</span>
                </li>
              );
            })}
          </div>
          <div className="line"></div>
          <div>
            <p>{data.product_name}</p>
            <div>
              <p>{data.owner.account.username}</p>
            </div>
          </div>
          <Link
            to="/payment"
            state={{ title: data.product_name, amount: data.product_price }}>
            <button>Acheter</button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Offer;
