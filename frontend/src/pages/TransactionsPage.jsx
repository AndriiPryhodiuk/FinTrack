import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/ui/SidebarMenu";
import CategoryIcon from "../components/ui/CategoryIcon";
import "../styles/dashboard.css";
import "../styles/transactions.css";
import {
  loadTransactions,
  saveTransactions,
} from "../utils/storage/transactionsStorage";

const categoryNames = {
  food: "Food and drink",
  entertainment: "Entertainment",
  shopping: "Clothes and shoes",
  utilities: "Rent",
  income: "Income",
  education: "Education",
  other: "Other",
};

const iconToCategoryMap = {
  "🛒": "food",
  "🎵": "entertainment",
  "🛍️": "shopping",
  "🏠": "utilities",
  "💼": "income",
  "📚": "education",
};

const TransactionsPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    category: "food",
    type: "expense",
  });

  useEffect(() => {
    const rawTxs = loadTransactions();

    const migrated = rawTxs.map((tx) => {
      if (tx.category) return tx;
      const category = iconToCategoryMap[tx.icon] || "other";
      return { ...tx, category };
    });

    setTransactions(migrated);
    saveTransactions(migrated);
  }, []);

  const filtered = transactions.filter((t) => {
    if (filter === "all") return true;
    if (filter === "income") return t.amount > 0;
    if (filter === "expense") return t.amount < 0;
  });

  const handleAddTransaction = () => {
    setForm({
      name: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      category: "food",
      type: "expense",
    });
    setShowModal(true);
  };

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.amount || isNaN(form.amount)) {
      alert("Fill all fields correctly");
      return;
    }

    const amount =
      form.type === "expense"
        ? -Math.abs(parseFloat(form.amount))
        : Math.abs(parseFloat(form.amount));

    const newTx = {
      ...form,
      amount,
      date: form.date || new Date().toISOString().slice(0, 10),
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);
    saveTransactions(updated);

    setShowModal(false);
  };

  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthYear = `${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;

  return (
    <div className="dashboard-gradient-bg">
      <button className="burger-btn" onClick={() => setShowMenu(true)}>
        ☰
      </button>
      <button onClick={() => navigate("/app/dashboard")} className="back-btn">
        ←
      </button>
      <SidebarMenu open={showMenu} onClose={() => setShowMenu(false)} />
      <div className="dashboard-center-wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h1 className="dashboard-title">Transactions</h1>
          <button
            className="dashboard-add-transaction-btn"
            onClick={handleAddTransaction}
          >
            + Add
          </button>
        </div>

        <div className="transactions-filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            all
          </button>
          <button
            className={filter === "income" ? "active" : ""}
            onClick={() => setFilter("income")}
          >
            income
          </button>
          <button
            className={filter === "expense" ? "active" : ""}
            onClick={() => setFilter("expense")}
          >
            expense
          </button>
        </div>

        <div className="transactions-date-header">{currentMonthYear}</div>

        <div className="transactions-list">
          {filtered.length === 0 ? (
            <div style={{ color: "#bcb6f6", textAlign: "center" }}>
              No transactions yet
            </div>
          ) : (
            filtered.map((t, i) => (
              <div className="transaction-card" key={i}>
                <CategoryIcon category={t.category} size={40} />
                <div className="transaction-info">
                  <span className="transaction-name">{t.name}</span>
                  <span className="transaction-date">{t.date}</span>
                </div>
                <span
                  className={`transaction-amount ${
                    t.amount > 0 ? "income" : "expense"
                  }`}
                >
                  {t.amount > 0 ? "+" : ""}
                  {t.amount < 0 ? "-" : ""}
                  {Math.abs(t.amount).toFixed(2)}$
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="transaction-modal">
          <form
            className="transaction-modal-content"
            onSubmit={handleSaveTransaction}
          >
            <h2>Add Transaction</h2>

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
              Amount
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </label>

            <label>
              Category
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="health">Health</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Type
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
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
  );
};

export default TransactionsPage;
