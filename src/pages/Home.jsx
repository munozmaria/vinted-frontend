import React from "react";
import { Link, useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import { apiUrl } from "../apiConfig";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SwitchPrice from "../components/SwitchPrice";
import RangeRate from "../components/RangeRate";

const Home = ({
  search,
  rangePriceOffers,
  sortedPrice,
  setSortedPrice,
  setRangePriceOffers,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/offers?title=${search}&priceMin=${
            rangePriceOffers[0]
          }&priceMax=${rangePriceOffers[1]}&sort=${
            !sortedPrice ? "price-desc" : "price-asc"
          }`
        );
        //console.log(response);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, rangePriceOffers, sortedPrice]);

  //console.log(data)

  return isLoading ? (
    <div className="containerLoading">
      <div className="spinner-square">
        <div className="square-1 square"></div>
        <div className="square-2 square"></div>
        <div className="square-3 square"></div>
      </div>
    </div>
  ) : (
    <>
      <Hero />
      <main className="container">
        <div className="filters">
          {currentPath === "/" && (
            <div>
              <SwitchPrice
                setSortedPrice={setSortedPrice}
                sortedPrice={sortedPrice}></SwitchPrice>
              <RangeRate setRangePriceOffers={setRangePriceOffers}></RangeRate>
            </div>
          )}
        </div>
        <div className="cardContainerMain">
          {data.offers &&
            data.offers.map((offer) => {
              //console.log(offer);
              return (
                <Link key={offer._id} to={`/offer/${offer._id}`}>
                  <div className="card">
                    {offer.owner && offer.owner.account && (
                      <div className="card-header">
                        {offer.owner.account.avatar ? (
                          <img
                            className="avatar"
                            src={offer.owner.account.avatar}
                            alt={offer.owner.account.username}
                          />
                        ) : (
                          <img
                            className="avatar"
                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                            alt={offer.owner.account.username}
                          />
                        )}
                        <span>{offer.owner.account.username}</span>
                      </div>
                    )}
                    <div className="card-body">
                      <img
                        src={offer.product_image.secure_url}
                        alt={offer.product_name}
                      />
                    </div>
                      <div className="card-footer">
                        <span style={{ fontWeight: "bold", paddingTop: "30px" }}>
                          {offer.product_price}€
                        </span>
                        <p style={{ fontStyle: "italic" }}>
                          {offer.product_name}
                        </p>
                      </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
