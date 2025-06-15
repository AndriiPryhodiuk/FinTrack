import { useNavigate } from "react-router-dom";
import "../styles/introStart.css";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-gradient-bg">
      <span className="logo-top">FinTrack</span>
      <div className="intro-center">
        <h1 className="intro-title">
          Manage your
          <br />
          finances with
          <br />
          ease
        </h1>
      </div>
      <button
        className="get-started-btn-bottom"
        onClick={() => navigate("/login")}
      >
        Get started
      </button>
    </div>
  );
};

export default Intro;
