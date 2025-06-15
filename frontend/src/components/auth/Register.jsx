import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import { apiClient } from "../../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await apiClient.register({ fullName, email, password });
      navigate("/login");
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intro-gradient-bg">
      <button className="back-btn" onClick={() => navigate("/login")}>
        &#8592;
      </button>
      <span className="logo-top">FinTrack</span>
      <div className="login-center">
        <h1 className="login-title">Create account</h1>
        <p className="register-subtitle">
          Join FinTrack to manage your finances
        </p>
        <form className="login-form" onSubmit={handleRegister}>
          {error && <div className="error-message">{error}</div>}
          <label>Full name</label>
          <input
            type="text"
            placeholder="Full name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
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
          <label>Repeat password</label>
          <input
            type="password"
            placeholder="Repeat password"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <div className="login-bottom-link">
          <span>Already have an account?</span>
          <button className="link-btn" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
