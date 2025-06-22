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
      console.log(res);
    } catch (error: any) {
      setMsg(error?.response?.data?.message || "Signup failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center border p-11">
        <h2>Sign Up</h2>
        <form className="flex flex-col justify-center m-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button className="bg-indigo-100" type="submit">Sign Up</button>
        </form>
        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

export default Signup;
