import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import useFetch from "../hooks/useFetch";


const Home = ({ search, rangePriceOffers, sortedPrice }) => {
  const queryParams = {
    title: search,
    priceMin: rangePriceOffers[0],
    priceMax: rangePriceOffers[1],
    sort: !sortedPrice ? "price-desc" : "price-asc",
  };

  const { data, isLoading } = useFetch("offers", queryParams);

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <>
      <Hero />
      <main className="container">
        {data.offers ? (
          data.offers.map((offer) => (
            <div key={offer._id} className="card">
              <Link to={`/offer/${offer._id}`}>
                <article>
                  <div className="card-header">
                    {offer.owner.account.avatar && (
                      <img
                        className="avatar"
                        src={offer.owner.account.avatar.secure_url}
                        alt={offer.owner.account.username}
                      />
                    )}
                    <span>{offer.owner.account.username}</span>
                  </div>
                  <div className="card-body">
                    <img
                      src={offer.product_image.secure_url}
                      alt={offer.product_name}
                    />
                    <p>{offer.product_price}€</p>
                    <p>{offer.product_name}</p>
                    <div className="product-details">
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
                  </div>
                </article>
              </Link>
            </div>
          ))
        ) : (
          <span>No offers available</span>
        )}
      </main>
    </>
  );
};

export default Home;
