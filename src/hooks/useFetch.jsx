import axios from "axios";
import { useEffect, useState } from "react";
import {apiUrl} from "../apiConfig";

const useFetch = (endpoint, queryParams) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${endpoint}`, {
            params: queryParams, 
          })
        //console.log(response);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [endpoint, queryParams]);

  return { data, isLoading };
};

export default useFetch