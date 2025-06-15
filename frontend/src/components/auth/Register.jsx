import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import { saveUser, userExists } from "../../utils/storage/userStorage";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (userExists(email)) {
      alert("User already exists!");
      return;
    }
    saveUser({ fullName, email, password });
    navigate("/login");
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
          <label>Full name</label>
          <input
            type="text"
            placeholder="Full name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <label>Repeat password</label>
          <input
            type="password"
            placeholder="Repeat password"
            required
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">
            Create account
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
