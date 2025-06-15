import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarMenu from "../components/ui/SidebarMenu";
import "../styles/dashboard.css";
import "../styles/goals.css";
import { apiClient } from "../utils/api";

const GoalDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [amount, setAmount] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadGoal();
  }, [id]);

  const loadGoal = async () => {
    try {
      setLoading(true);
      const apiGoal = await apiClient.getGoal(id);
      // Transform API goal to frontend format
      const transformedGoal = {
        id: apiGoal.id,
        name: apiGoal.name,
        target: apiGoal.targetAmount,
        current: apiGoal.currentAmount || 0,
        icon: apiGoal.iconName,
        category: apiGoal.category,
      };
      setGoal(transformedGoal);
    } catch (error) {
      setError("Failed to load goal");
      console.error("Error loading goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) return;

    try {
      // Create a transaction to add money to the goal
      await apiClient.createTransaction({
        name: `Added to ${goal.name}`,
        amount: Number(amount),
        type: "income",
        goalId: goal.id,
      });
      
      // Reload the goal to get updated current amount
      await loadGoal();
      setAmount("");
    } catch (error) {
      setError("Failed to add amount");
      console.error("Error adding amount:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (!confirmDelete) return;

    try {
      await apiClient.deleteGoal(id);
      navigate("/app/goals");
    } catch (error) {
      setError("Failed to delete goal");
      console.error("Error deleting goal:", error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-gradient-bg">
        <div className="dashboard-center-wrap">
          <h1 className="dashboard-title">Loading goal...</h1>
        </div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="dashboard-gradient-bg">
        <div className="dashboard-center-wrap">
          <h1 className="dashboard-title">Goal not found</h1>
          <button onClick={() => navigate("/app/goals")}>Back to Goals</button>
        </div>
      </div>
    );
  }

  const percentage = goal.target
    ? Math.min(100, Math.round((goal.current / goal.target) * 100))
    : 0;

  return (
    <div className="dashboard-gradient-bg">
      <button className="back-btn" onClick={() => navigate("/app/goals")}>
        ←
      </button>
      <button className="burger-btn" onClick={() => setShowMenu(true)}>
        ☰
      </button>
      <SidebarMenu open={showMenu} onClose={() => setShowMenu(false)} />
      <div className="dashboard-center-wrap">
        <h1 className="dashboard-title">{goal.name}</h1>
        
        {error && <div className="error-message">{error}</div>}
        
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

        <button
          onClick={handleDelete}
          style={{
            background: "#ff6b6b",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Delete Goal
        </button>
      </div>
    </div>
  );
};

export default GoalDetailsPage;
