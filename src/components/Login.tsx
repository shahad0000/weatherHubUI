import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const BASE_URL = "https://weatherhubapi.onrender.com";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${BASE_URL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      navigate("/weather");
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col  ">
        <h2>Login</h2>
        <form className="border p-4 flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border"
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label>Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border"
            />
          </div>
          <button type="submit" className=" bg-indigo-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-rose-800">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
