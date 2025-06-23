import axios from "axios";

  const BASE_URL = "https://weatherhubapi.onrender.com";
// const BASE_URL = "http://localhost:3000";

interface query {
  skip?: number;
  limit?: number;
  sort?: string;
  from?: string;
  to?: string;
  lat?: number;
  lon?: number;
  count?: boolean;
}

const getHistory = async (query: query = {}) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) params.append(key, String(value));
  });
  try {
    const res = await axios.get(`${BASE_URL}/history?${params.toString()}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err: any) {
    console.error(err);
    throw new Error("Failed to fetch history data");
  }
};

export default getHistory;
