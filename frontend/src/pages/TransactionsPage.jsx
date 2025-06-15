import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/ui/SidebarMenu";
import CategoryIcon from "../components/ui/CategoryIcon";
import "../styles/dashboard.css";
import "../styles/transactions.css";
import { apiClient } from "../utils/api";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    category: "food",
    type: "expense",
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const apiTransactions = await apiClient.getTransactions();
      // Transform API transactions to frontend format
      const transformedTransactions = apiTransactions.map(transaction => ({
        id: transaction.id,
        name: transaction.description,
        amount: transaction.type === 'EXPENSE' ? -Math.abs(transaction.amount) : Math.abs(transaction.amount),
        date: transaction.createdAt ? new Date(transaction.createdAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        category: "other", // Default category since backend doesn't have this
        type: transaction.type.toLowerCase(),
      }));
      setTransactions(transformedTransactions);
    } catch (error) {
      setError("Failed to load transactions");
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveTransaction = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.amount || isNaN(form.amount)) {
      alert("Fill all fields correctly");
      return;
    }

    try {
      const transactionData = {
        name: form.name,
        amount: parseFloat(form.amount),
        type: form.type,
        date: form.date,
      };

      await apiClient.createTransaction(transactionData);
      await loadTransactions(); // Reload transactions from server
      setShowModal(false);
    } catch (error) {
      setError("Failed to create transaction");
      console.error("Error creating transaction:", error);
    }
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

  if (loading) {
    return (
      <div className="dashboard-gradient-bg">
        <div className="dashboard-center-wrap">
          <h1 className="dashboard-title">Loading transactions...</h1>
        </div>
      </div>
    );
  }

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

        {error && <div className="error-message">{error}</div>}

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
            filtered.map((t) => (
              <div className="transaction-card" key={t.id}>
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
              Description
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
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
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

            <label>
              Date
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
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
