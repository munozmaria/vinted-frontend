import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";



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
        console.log(response.data);
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
            ); 
          })}
        </div>
        <Link to='/payment'><button>Acheter</button></Link>
        </div>
        
      </article>
    </div>
  );
};

export default Offer;
