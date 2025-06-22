import axios from "axios";
import { useEffect } from "react";

const BASE_URL = "https://weatherhubapi.onrender.com";

const getWeather = async () => {
  const res = await axios.get(`${BASE_URL}/weather?lat=24.71&lon=46.68`, {
    withCredentials: true,
  });
  console.log(res.data);
};



const Weather = () => {
    useEffect(() => {
        getWeather();
      }, []);
  return <div>This is the weather page</div>;
};

export default Weather;
