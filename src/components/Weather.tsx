import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://weatherhubapi.onrender.com";

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);

  const getWeather = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/weather?lat=24.71&lon=46.68`, {
        withCredentials: true,
      });
      setWeather({
        ...res.data.data,
        fetchedAt: res.data.fetchedAt,
        source: res.data.source,
      });
      
      console.log(res.data)
    } catch (err: any) {
      console.error(err);
    }
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      {weather &&
        weather.main &&
        weather.weather &&
        weather.weather[0] &&
        weather.wind && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl"> {weather.name || "Unknown Location"}</h2>
            <p>
              {(weather.main.temp - 273.15).toFixed(1)}
              °C
            </p>
            <p>
              {weather.weather?.[0]?.description || "unavailable"}
            </p>
            <p>
              <strong>Wind Speed:</strong>
              {weather.wind.speed} m/s
            </p>
      
          </div>
        )}
    </div>
  );
};

export default Weather;
