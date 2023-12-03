import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { apiUrl } from "../apiConfig";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SwitchPrice from "../components/SwitchPrice";
import RangeRate from "../components/RangeRate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faStar);

const Home = ({
  rangePriceOffers,
  sortedPrice,
  setSortedPrice,
  setRangePriceOffers,
  productDetailsSearch,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(sortedPrice)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (
          Array.isArray(rangePriceOffers) &&
          rangePriceOffers.length === 2 &&
          rangePriceOffers[0] !== rangePriceOffers[1]
        ) {
          queryParams.set("priceMin", rangePriceOffers[0]);
          queryParams.set("priceMax", rangePriceOffers[1]);
        }
        navigate({ search: `?${queryParams.toString()}` });
        
        const response = await axios.get(`${apiUrl}/offers${location.search}`);
        console.log(response.data)
        
        let sortedOffers = [...response.data.offers];
        if (sortedPrice === "price-asc") {
          sortedOffers.sort((a, b) => a.product_price - b.product_price);
        } else if (sortedPrice === "price-desc") {
          sortedOffers.sort((a, b) => b.product_price - a.product_price);
        }

        setData({ ...response.data, offers: sortedOffers });

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productDetailsSearch, location.pathname, sortedPrice, rangePriceOffers]);

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
        <span className="counterOffers">
          <span style={{ fontSize: "24px" }}>{data.count} </span>resultats
          disponibles <FontAwesomeIcon icon={faStar} className="fa-beat" />
        </span>
        <div className="filters">
          {location.pathname === "/" && (
            <div>
              <SwitchPrice
                setSortedPrice={setSortedPrice}
                sortedPrice={sortedPrice}></SwitchPrice>
              <RangeRate setRangePriceOffers={setRangePriceOffers} ></RangeRate>
            </div>
          )}
        </div>
        <div className="cardContainerMain">
          {data.offers &&
            data.offers.map((offer) => {
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
                          <div className="image-not-available">
                            {offer.owner.account.username.charAt(0)}
                          </div>
                        )}
                        <span>{offer.owner.account.username}</span>
                      </div>
                    )}

                    <div className="card-body">
                      {offer.product_image ? (
                        <img
                          src={offer.product_image[0].secure_url}
                          alt={offer.product_name}
                        />
                      ) : (
                        <div className="image-not-available">
                          {offer.product_details[0]?.MARQUE}
                        </div>
                      )}
                    </div>
                    <div className="card-footer">
                      <span style={{ fontWeight: "bold", paddingTop: "30px" }}>
                      {parseFloat(offer.product_price).toFixed(2)}€
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}>
                        <p style={{ fontWeight: "bold", color: "#2baeb7" }}>
                          {offer.product_name}
                        </p>
                        <div>
                          <span style={{ fontWeight: "bold" }}>
                            {offer.product_details[0].MARQUE}
                          </span>
                          /<span>{offer.product_details[4].EMPLACEMENT}</span>
                        </div>
                      </div>
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
