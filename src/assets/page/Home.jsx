import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../../components/Hero";

const Home = () => {

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? <span>En cours de chargement... </span> : (
    <>
    <Hero/>
    </>
  );
};

export default Home;
