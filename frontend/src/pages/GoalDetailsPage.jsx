import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import "../styles/dashboard.css";
import "../styles/goals.css";
import { getGoals, saveGoals } from "../components/goalsStorage";

const GoalDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [amount, setAmount] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const goals = getGoals();
    setGoal(goals[id]);
  }, [id]);

  if (!goal) return null;

  const percentage = goal.target
    ? Math.min(100, Math.round((goal.current / goal.target) * 100))
    : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) return;
    const goals = getGoals();
    goals[id].current = (goals[id].current || 0) + Number(amount);
    saveGoals(goals);
    setGoal(goals[id]);
    setAmount("");
  };

  const handleDelete = (goalId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (!confirmDelete) return;

    const goals = getGoals();
    goals.splice(goalId, 1);
    saveGoals(goals);
    navigate("/goals");
  };

  return (
    <div className="dashboard-gradient-bg">
      <button className="back-btn" onClick={() => navigate("/goals")}>
        ←
      </button>
      <button className="burger-btn" onClick={() => setShowMenu(true)}>
        ☰
      </button>
      <SidebarMenu open={showMenu} onClose={() => setShowMenu(false)} />
      <div className="dashboard-center-wrap">
        <h1 className="dashboard-title">{goal.name}</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "32px 0",
          }}
        >
          <svg width="140" height="140">
            <circle
              cx="70"
              cy="70"
              r="60"
              stroke="#ddd"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="70"
              cy="70"
              r="60"
              stroke="#a682ff"
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 60}
              strokeDashoffset={2 * Math.PI * 60 * (1 - percentage / 100)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.5s" }}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy="0.35em"
              fontSize="22"
              fill="#fff"
              fontWeight="bold"
            >
              {percentage}%
            </text>
          </svg>
          <div style={{ color: "#fff", marginTop: 16, fontSize: 18 }}>
            ${goal.current || 0} / ${goal.target}
          </div>
          <div style={{ color: "#7c6ee6", marginTop: 4 }}>
            {goal.target - (goal.current || 0) > 0
              ? `$${goal.target - (goal.current || 0)} left`
              : "Goal reached!"}
          </div>
        </div>

        <form
          onSubmit={handleAdd}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <input
            type="number"
            placeholder="Add amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              fontSize: 18,
              width: 180,
              marginBottom: 8,
            }}
            required
          />
          <button
            type="submit"
            style={{
              background: "#a682ff",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px 32px",
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalDetailsPage;
