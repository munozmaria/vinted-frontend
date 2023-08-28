import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/Hero";

const Home = ({ search, rangePriceOffers }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=${rangePriceOffers[0]}&priceMax=${rangePriceOffers[1]}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        //console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [search, rangePriceOffers]);

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <>
      <Hero />
      <main className="container">
        {data.offers.map((offer) => {
          // console.log(offer)
          return (
            <div key={offer._id}>
              <Link to={`/offer/${offer._id}`}>
                <article>
                  <div>
                    {offer.owner.account.avatar && (
                      <img
                        className="avatar"
                        src={offer.owner.account.avatar.secure_url}
                        alt={offer.owner.account.username}
                      />
                    )}
                    <span>{offer.owner.account.username}</span>
                  </div>
                  <div>
                    <img
                      src={offer.product_image.secure_url}
                      alt={offer.product_name}
                    />
                  </div>
                  <div>
                    <p>{offer.product_price}€</p>
                    <p>{offer.product_name}</p>
                    {offer.product_details.map((detail, index) => {
                      if (detail.MARQUE) {
                        return <p key={index}>{detail.MARQUE}</p>;
                      } else if (detail.TAILLE) {
                        return <p key={index}>{detail.TAILLE}</p>;
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </article>
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Home;
