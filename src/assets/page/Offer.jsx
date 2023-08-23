import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
       // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        console.log(data);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  

  return isLoading ? (
    <span>No data... </span>
  ) : (
    <div className="offre">
    
      <article>
                  <div>
                    <img src={data.product_image.url} alt="" />
                  </div>
                <div>
                    <p>{data.owner.account.username}</p>
                  </div>
                  <div>
                    <p>{data.product_price}€</p>
                    <p>{data.product_name}</p>
                  </div>
              </article>
   
    </div>
      
  );
};

export default Offer;
