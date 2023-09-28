import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { apiUrl } from "../apiConfig";

const Profil = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/${id}`);
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
  
     
  </div>
  );
};

export default Profil;
