import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import SidebarMenu from "../components/ui/SidebarMenu";
import {
  getUserFullName,
  getUserBalance,
  saveUserBalance,
} from "../utils/storage/userStorage";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ name: "User", balance: 0 });
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const storedName = getUserFullName();
    const storedBalance = getUserBalance();
    const goalsFromStorage = JSON.parse(
      localStorage.getItem("goalsData") || "[]"
    );
    if (storedName) {
      setUserName(storedName);
      setUser({ name: storedName, balance: storedBalance });
      setGoals(goalsFromStorage);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddBalance = () => {
    const amount = prompt("Enter amount to add:");
    if (amount && !isNaN(amount)) {
      const newBalance = user.balance + parseFloat(amount);
      setUser({ ...user, balance: newBalance });
      saveUserBalance(newBalance);
    }
  };

  return (
    <div className="dashboard-gradient-bg">
      <button className="burger-btn" onClick={() => setShowMenu(!showMenu)}>
        ☰
      </button>
      <SidebarMenu open={showMenu} onClose={() => setShowMenu(false)} />
      <h1>Hello, {user.name}!</h1>
      <div className="balance-card">
        <div>
          <span>My balance</span>
          <button className="plus-btn" onClick={handleAddBalance}>
            +
          </button>
        </div>
        <div className="balance-amount">${user.balance.toFixed(2)}</div>
        <div className="card-details">
          <span>**** 0886</span>
          <span>VISA</span>
        </div>
      </div>
      <div className="goals-header">
        <span>Goal</span>
        <button className="seeall-btn" onClick={() => navigate("/app/goals")}>
          See all
        </button>
      </div>
      <div className="goals-list">
        {goals.slice(0, 3).map((goal, idx) => (
          <div
            className="goal-card"
            key={goal.name + idx}
            onClick={() => navigate(`/app/goal/${idx}`)}
            style={{ cursor: "pointer" }}
          >
            <span className="goal-icon">{goal.icon || "🎯"}</span>
            <div>
              <span>{goal.name}</span>
              <span>Goal ${goal.target}</span>
            </div>
            <span>
              {goal.target
                ? Math.round(((goal.current || 0) / goal.target) * 100)
                : 0}
              %
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
