import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/ui/SidebarMenu";
import "../styles/dashboard.css";
import "../styles/goals.css";
import { getGoals, saveGoals } from "../utils/storage/goalsStorage";

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

  const [form, setForm] = useState({
    name: "",
    target: "",
    category: categoryOptions[0],
  });

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  const handleAddGoal = () => {
    setForm({ name: "", target: "", category: categoryOptions[0] });
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.target || isNaN(form.target)) return;

    const newGoal = {
      name: form.name,
      target: parseFloat(form.target),
      icon: form.category.icon,
      color: form.category.color,
      current: 0,
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
    setForm({ name: "", target: "", category: categoryOptions[0] });
    setShowModal(false);
  };

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

        <div className="goals-list">
          {goals.map((goal, idx) => {
            const percentage = goal.target
              ? Math.min(100, (goal.current / goal.target) * 100)
              : 0;
            return (
              <div
                className="goal-card"
                key={goal.name + idx}
                onClick={() => navigate(`/app/goal/${idx}`)}
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
