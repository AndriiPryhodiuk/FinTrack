import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarMenu from "../components/ui/SidebarMenu";

const CategoryTransactionsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const txs = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(txs.filter((t) => t.category === category));
  }, [category]);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="dashboard-gradient-bg">
      <button className="back-btn" onClick={() => navigate("/app/expenses")}>
        ←
      </button>
      <SidebarMenu />
      <div className="dashboard-center-wrap">
        <h1 className="dashboard-title">
          {category}
          <span style={{ fontSize: 18, color: "#bcb6f6", marginLeft: 12 }}>
            {transactions.length} transaction
            {transactions.length !== 1 ? "s" : ""}
          </span>
        </h1>
        <div className="transactions-list">
          {sortedTransactions.length === 0 ? (
            <div style={{ color: "#bcb6f6", textAlign: "center" }}>
              No transactions
            </div>
          ) : (
            sortedTransactions.map((t, i) => (
              <div className="transaction-card" key={i}>
                <span
                  className="transaction-icon"
                  style={{
                    fontSize: 36,
                    background: "#18181b",
                    borderRadius: "50%",
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  {t.icon}
                </span>
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
                  {Math.abs(t.amount).toFixed(2)}$
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTransactionsPage;
