import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/introStart.css";
import { apiClient } from "../../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient.login({ email, password });
      // Save email as username for now (will be replaced with proper user info)
      localStorage.setItem("userFullName", email.split("@")[0]);
      navigate("/app/dashboard");
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intro-gradient-bg">
      <span className="logo-top">FinTrack</span>
      <div className="login-center">
        <h1 className="login-title">Welcome back</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <div className="login-links">
            <button type="button" className="forgot-btn">
              Forgot password ?
            </button>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="login-bottom-link">
          <span>Don't have an account?</span>
          <button className="link-btn" onClick={() => navigate("/register")}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
