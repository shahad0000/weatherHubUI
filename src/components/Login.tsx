import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://weatherhubapi.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-slate-50">
      <h2 className="text-3xl">Login</h2>
      <div className="flex">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center shadow-md p-11 bg-white gap-3"
        >
          <div>
            <div>Email:</div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border"
            />
          </div>
          <div>
            <div>Password:</div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border"
            />
          </div>
          <button
            type="submit"
            className=" bg-indigo-100 border border-gray-400 rounded-sm px-11"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-rose-800">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
