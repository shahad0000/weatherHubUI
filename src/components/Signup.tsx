import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://weatherhubapi.onrender.com";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        { email, password },
        { withCredentials: true }
      );
      setMsg("Signup successful!");
      console.log(res.data);
    } catch (error: any) {
      setMsg(error?.response?.data?.message || "Signup failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-slate-50">
      <h2 className="text-2xl">Sign Up</h2>
      <div className="flex flex-col justify-center items-center shadow-md p-11 bg-white">
        <form
          className="flex flex-col justify-center m-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-400 p-1"
          />
<br />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-400 p-1"
          />
          <br />
          <br />
          <button className="bg-indigo-100 p-1 border border-gray-400 rounded-md" type="submit">
            Sign Up
          </button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

export default Signup;
