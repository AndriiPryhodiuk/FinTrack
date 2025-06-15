import { useNavigate } from "react-router-dom";
import "../styles/introStart.css";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-start">
      <div className="intro-header">
        <span className="logo">FinTrack</span>
      </div>
      <div className="intro-main">
        <div className="content-box">
          <h1 className="title">Manage your finances with ease</h1>
          <button className="start-btn" onClick={() => navigate("/login")}>
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
