import axios from "axios";

const getWeather = async (lat: string, lon: string) => {
  const BASE_URL = "https://weatherhubapi.onrender.com";
//   const BASE_URL = "http://localhost:3000";

  try {
    const res = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}`, {
      withCredentials: true,
    });
    return {
      data: res.data.data,
      fetchedAt: res.data.fetchedAt,
      source: res.data.source,
    };
  } catch (err: any) {
    console.error(err);
    throw new Error("Failed to fetch weather data");
  }
};

export default getWeather;
