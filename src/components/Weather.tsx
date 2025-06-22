import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://weatherhubapi.onrender.com";

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const getWeather = async () => {
    const res = await axios.get(`${BASE_URL}/weather?lat=24.71&lon=46.68`, {
      withCredentials: true,
    });
    console.log(res.data);
    setWeather(res.data);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <div>
      {weather ? (
        <div>
          <h2>Weather in {weather.name || "Unknown Location"}</h2>
          <p>
            <strong>Temperature:</strong>
            {weather.main?.temp !== undefined
              ? (weather.main.temp - 273.15).toFixed(1)
              : "N/A"}{" "}
            °C
          </p>
          <p>
            <strong>Condition:</strong>
            {weather.weather?.[0]?.description || "N/A"}
          </p>
          <p>
            <strong>Wind Speed:</strong>
            {weather.wind?.speed !== undefined ? weather.wind.speed : "N/A"} m/s
          </p>
          <p>
            <strong>Fetched At:</strong>
            {weather.fetchedAt
              ? new Date(weather.fetchedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default Weather;
