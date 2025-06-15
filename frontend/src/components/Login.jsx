import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/introStart.css";
import { findUser } from "./userStorage";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = findUser({ email, password });
    if (user) {
      localStorage.setItem("userFullName", user.fullName);
      navigate("/app/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="intro-gradient-bg">
      <span className="logo-top">FinTrack</span>
      <div className="login-center">
        <h1 className="login-title">Welcome back</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-links">
            <button type="button" className="forgot-btn">
              Forgot password ?
            </button>
          </div>
          <button type="submit" className="login-btn">
            Sign in
          </button>
        </form>
        <div className="login-bottom-link">
          <span>Don’t have an account?</span>
          <button className="link-btn" onClick={() => navigate("/register")}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
