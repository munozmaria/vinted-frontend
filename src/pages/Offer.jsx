import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { apiUrl } from "../apiConfig";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/offer/${id}`);
        setData(response.data);
        setIsLoading(false);
        //console.log(data)
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
        {data.product_image && (
          <img src={data.product_image.secure_url} alt={data.product_name} />
        )}
      </div>
      <div className="offre-details">
        <p className="offer-price">{data.product_price}€</p>

        <div className="offer-list-data">
          {Array.isArray(data.product_details) && data.product_details.length > 0 ? (
            data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              const key = keys[0];

              return (
                <li key={index}>
                  <span>{key}:</span>
                  <span>{detail[key]}</span>
                </li>
              );
            })
          ) : (
            <p>No product details available</p>
          )}
        </div>
        <div className="line"></div>
        <div>
          <p>{data.product_name}</p>
          <div>
            {data.owner && data.owner.account && (
              <p>{data.owner.account.username}</p>
            )}
          </div>
        </div>
        <Link
          to="/payment"
          state={{ title: data.product_name, amount: data.product_price }}
        >
          <button>Acheter</button>
        </Link>
      </div>
    </article>
  </div>
  );
};

export default Offer;
