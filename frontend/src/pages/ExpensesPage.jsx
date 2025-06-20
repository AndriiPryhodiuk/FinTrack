import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/ui/SidebarMenu";
import "../styles/dashboard.css";
import DonutChart from "../components/ui/DonutChart";
import { apiClient } from "../utils/api";

const CATEGORY_COLORS = {
  "🛒": "#4BE36A",
  "🎵": "#FF00C3",
  "🛍️": "#FFD600",
  "🏠": "#4B7BE3",
  "💼": "#A682FF",
  "📚": "#FF8C00",
  "💡": "#0000ff",
};
const CATEGORY_LABELS = {
  "🛒": "Food and drink",
  "🎵": "Entertainment",
  "🛍️": "Clothes and shoes",
  "🏠": "Rent",
  "💼": "Income",
  "📚": "Education",
  "💡": "Other",
};
const CATEGORY_ICONS = {
  food: "🛒",
  entertainment: "🎵",
  shopping: "🛍️",
  utilities: "🏠",
  income: "💼",
  education: "📚",
  other: "💡",
};

const ExpensesPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const apiTransactions = await apiClient.getTransactions();
      // Transform and filter expense transactions
      const expenseTransactions = apiTransactions
        .filter(transaction => transaction.type === 'EXPENSE')
        .map(transaction => ({
          id: transaction.id,
          name: transaction.description,
          amount: -Math.abs(transaction.amount), // Negative for expenses
          date: transaction.createdAt ? new Date(transaction.createdAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
          category: "other", // Default category since backend doesn't have this
        }));
      setTransactions(expenseTransactions);
    } catch (error) {
      setError("Failed to load transactions");
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-gradient-bg">
        <div className="dashboard-center-wrap">
          <h1 className="dashboard-title">Loading expenses...</h1>
        </div>
      </div>
    );
  }

  const categories = {};
  transactions.forEach((tx) => {
    const icon = CATEGORY_ICONS[tx.category] || "💡";
    if (!categories[icon])
      categories[icon] = {
        sum: 0,
        count: 0,
        label: CATEGORY_LABELS[icon] || "Other",
        color: CATEGORY_COLORS[icon] || "#18181b",
      };
    categories[icon].sum += Math.abs(tx.amount);
    categories[icon].count += 1;
  });
  const chartData = Object.entries(categories)
    .map(([icon, data]) => ({ icon, ...data }))
    .sort((a, b) => b.sum - a.sum);
  const total = chartData.reduce((a, c) => a + c.sum, 0);

  let currentMonthYear = "";
  if (transactions.length > 0) {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const date = new Date(sorted[0].date);
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
    currentMonthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
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
        {error && <div className="error-message">{error}</div>}
        
        <div className="expenses-header">
          <h1 className="expenses-title">{currentMonthYear || "Expenses"}</h1>
          <span className="expenses-total">
            -$
            {transactions
              .reduce((a, t) => a + Math.abs(t.amount), 0)
              .toFixed(2)}
          </span>
        </div>
        {chartData.length > 0 ? (
          <>
            <div className="expenses-chart-wrap">
              <DonutChart data={chartData} total={total} />
            </div>
            <div className="expenses-transactions-title">Transactions</div>
            <div className="expenses-transactions-list">
              {chartData.map((cat, idx) => (
                <div className="expenses-transaction-row" key={cat.icon}>
                  <span
                    className="expenses-transaction-icon"
                    style={{ background: cat.color }}
                  >
                    {cat.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{cat.label}</div>
                    <div style={{ fontSize: 14, opacity: 0.7 }}>
                      {cat.count} transaction{cat.count > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>
                    -${cat.sum.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ color: "#bcb6f6", textAlign: "center", marginTop: "50px" }}>
            No expense transactions yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;
