import { useState } from "react";
import { useNavigate } from "react-router";
import { userLogin } from "../services/auth.services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await userLogin(email, password);
      navigate("/");
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
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-sky-50">
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
              className="border border-gray-400 px-2 rounded-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <div>Password:</div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded-sm px-2"
              placeholder="password"
            />
          </div>
          <button
              type="submit"
              className=" bg-amber-100 border border-gray-400 mt-4 rounded-sm px-11"
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
