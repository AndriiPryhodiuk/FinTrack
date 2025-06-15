import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/ui/SidebarMenu";
import "../styles/dashboard.css";
import "../styles/goals.css";
import { apiClient } from "../utils/api";

const categoryOptions = [
  { name: "Transport", icon: "🚗", color: "#4B9CD3" },
  { name: "Home", icon: "🏠", color: "#7CFC00" },
  { name: "Education", icon: "📚", color: "#9370DB" },
  { name: "Entertainment", icon: "🎵", color: "#FF6347" },
  { name: "Shopping", icon: "🛍️", color: "#FF69B4" },
  { name: "Health", icon: "💊", color: "#FF4500" },
  { name: "Other", icon: "💡", color: "#808080" },
];

const GoalsPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    target: "",
    category: categoryOptions[0],
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const apiGoals = await apiClient.getGoals();
      // Transform API goals to frontend format
      const transformedGoals = apiGoals.map(goal => ({
        id: goal.id,
        name: goal.name,
        target: goal.targetAmount,
        current: goal.currentAmount || 0,
        icon: goal.iconName,
        color: categoryOptions.find(cat => cat.name === goal.category)?.color || "#808080",
      }));
      setGoals(transformedGoals);
    } catch (error) {
      setError("Failed to load goals");
      console.error("Error loading goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = () => {
    setForm({ name: "", target: "", category: categoryOptions[0] });
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.target || isNaN(form.target)) return;

    try {
      const goalData = {
        name: form.name,
        target: parseFloat(form.target),
        icon: form.category.icon,
        category: form.category,
      };

      await apiClient.createGoal(goalData);
      await loadGoals(); // Reload goals from server
      setForm({ name: "", target: "", category: categoryOptions[0] });
      setShowModal(false);
    } catch (error) {
      setError("Failed to create goal");
      console.error("Error creating goal:", error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-gradient-bg">
        <div className="dashboard-center-wrap">
          <h1 className="dashboard-title">Loading goals...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-gradient-bg">
      <button className="back-btn" onClick={() => navigate("/app/dashboard")}>
        ←
      </button>
      <button className="burger-btn" onClick={() => setShowMenu(true)}>
        ☰
      </button>
      <SidebarMenu open={showMenu} onClose={() => setShowMenu(false)} />

      <div className="dashboard-center-wrap">
        <h1 className="dashboard-title">Saving goals</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="goals-list">
          {goals.map((goal) => {
            const percentage = goal.target
              ? Math.min(100, (goal.current / goal.target) * 100)
              : 0;
            return (
              <div
                className="goal-card"
                key={goal.id}
                onClick={() => navigate(`/app/goal/${goal.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="goal-icon"
                  style={{ backgroundColor: goal.color }}
                >
                  <span role="img" aria-label="goal">
                    {goal.icon}
                  </span>
                </div>
                <div className="goal-info">
                  <div className="goal-title">{goal.name}</div>
                  <div className="goal-progress-bar">
                    <div
                      className="goal-progress"
                      data-progress={percentage}
                      style={{
                        width: `${percentage}%`,
                        background: "#a682ff",
                      }}
                    ></div>
                  </div>
                  <div className="goal-amounts">
                    <span>${goal.current || 0}</span>
                    <span>${goal.target}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="add-goal-btn" onClick={handleAddGoal}>
          + Add New Goal
        </button>

        {showModal && (
          <div className="transaction-modal">
            <form
              className="transaction-modal-content"
              onSubmit={handleFormSubmit}
            >
              <h2>Add Goal</h2>

              <label>
                Name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label>
                Target Amount
                <input
                  type="number"
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                  required
                />
              </label>

              <label>
                Category
                <select
                  value={form.category.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: categoryOptions.find(
                        (opt) => opt.name === e.target.value
                      ),
                    })
                  }
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.icon} {opt.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="transaction-modal-buttons">
                <button type="submit" className="primary-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
