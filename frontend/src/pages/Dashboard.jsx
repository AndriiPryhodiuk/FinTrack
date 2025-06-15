import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import SidebarMenu from "../components/ui/SidebarMenu";
import {
  getUserFullName,
  getUserBalance,
  saveUserBalance,
} from "../utils/storage/userStorage";
import { apiClient } from "../utils/api";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ name: "User", balance: 0 });
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = getUserFullName();
    const storedBalance = getUserBalance();
    
    if (storedName) {
      setUserName(storedName);
      setUser({ name: storedName, balance: storedBalance });
      loadGoals();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const loadGoals = async () => {
    try {
      const apiGoals = await apiClient.getGoals(3); // Limit to 3 for dashboard
      // Transform API goals to frontend format
      const transformedGoals = apiGoals.map(goal => ({
        id: goal.id,
        name: goal.name,
        target: goal.targetAmount,
        current: goal.currentAmount || 0,
        icon: goal.iconName,
      }));
      setGoals(transformedGoals);
    } catch (error) {
      console.error("Error loading goals:", error);
      // Fallback to empty array if API fails
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          <div style={{ color: "#bcb6f6", textAlign: "center" }}>
            Loading goals...
          </div>
        ) : goals.length === 0 ? (
          <div style={{ color: "#bcb6f6", textAlign: "center" }}>
            No goals yet. <button onClick={() => navigate("/app/goals")}>Add your first goal</button>
          </div>
        ) : (
          goals.map((goal) => (
            <div
              className="goal-card"
              key={goal.id}
              onClick={() => navigate(`/app/goal/${goal.id}`)}
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
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
