import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://weatherhubapi.onrender.com";

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/weather?lat=24.71&lon=46.68`, {
        withCredentials: true,
      });
      setWeather(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWeather();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
