import { useState } from "react";
import getWeather from "../services/weather.services";
import { Link } from "react-router";
const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lat || !lon) {
      setError("Please enter both latitude and longitude.");
      return;
    }
    try {
      const res = await getWeather(lat, lon);

      setWeather({
        ...res.data,
        fetchedAt: res.fetchedAt,
        source: res.source,
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-sky-50">
   <div className=" text-right">
        <Link className="text-3xl font-bold text-gray-700" to="/history">
          History
        </Link>
      </div>      <div className="flex flex-col justify-center  items-center">
        <h1 className="text-4xl text-gray-600">
          Enter your coordinates to get the current weather
        </h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center gap-2 m-4"
          >
            <input
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              className="border bg-white px-2 border-gray-400 p-1"
            />
            <br />
            <input
              type="text"
              placeholder="Longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              required
              className="border bg-white px-2 border-gray-400"
            />
            <br />
            <br />
            <button
              className="bg-amber-100 px-3 border border-gray-400 rounded-md"
              type="submit"
            >
              Search
            </button>
          </form>
          {error && <p className="text-rose-700">{error}</p>}
        </div>
        {weather &&
          weather.main &&
          weather.weather &&
          weather.weather[0] &&
          weather.wind && (
            <div className="flex flex-col items-center justify-center gap-4 bg-white px-20 p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-700">
                {weather.name || "Unknown Location"}
              </h2>
              <p className="text-3xl font-bold">
                {(weather.main.temp - 273.15).toFixed(1)}
                °C
              </p>
              <p>{weather.weather?.[0]?.description || "unavailable"}</p>
              <p>
                <span className="font-bold">
                  wind: {weather.wind.speed} m/s
                </span>
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Weather;
