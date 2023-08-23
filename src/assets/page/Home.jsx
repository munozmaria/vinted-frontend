import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../../components/Hero";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const [offerSelected, setOfferSelected] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    //console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleOffer = (offer) => {
  //   //console.log(offer)
  //   const offersCopy = [...offerSelected];
  //   const offerPresent = offersCopy.find((elem) => elem.id === offer.id);
  //   if (offerPresent) {
  //     offerPresent.quantity++;
  //   } else {
  //     const obj = { ...offer, quantity: 1 };
  //     offersCopy.push(obj);
  //   }
  //   setOfferSelected(offersCopy);

  // //console.log(offers)
  // };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <Hero />
      <main className="container">
        {data.offers.map((offer) => {
          // console.log(offer)
          return (
            <div key={offer._id}>
              <Link
                to={`/offer/${offer._id}`}
               >
                <article>
                  <div>
                    <p>{offer.owner.account.username}</p>
                  </div>
                  <div>
                    <img src={offer.product_image.url} alt="" />
                  </div>
                  <div>
                    <p>{offer.product_price}€</p>
                    <p>{offer.product_name}</p>
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
