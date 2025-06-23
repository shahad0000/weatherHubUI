import axios from "axios";

const BASE_URL = "https://weatherhubapi.onrender.com";
// const BASE_URL = "http://localhost:3000";

export const userLogin = async (email: string, password: string) => {
  const res = await axios.post(
    `${BASE_URL}/auth/signin`,
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

export const userSignup = async (email: string, password: string) => {
  const res = await axios.post(
    `${BASE_URL}/auth/signup`,
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

export const userSignout = async () => {
  const res = await axios.post(
    `${BASE_URL}/auth/signout`,
  );
  return res.data;
};