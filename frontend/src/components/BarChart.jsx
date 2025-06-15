import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/chart.css";

const BarChart = ({ transactions }) => {
  const categorizeTransactions = () => {
    const categories = {};
    transactions.forEach((transaction) => {
      const category = transaction.category;
      const amount = transaction.amount;

      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += amount;
    });
    return categories;
  };

  const data = categorizeTransactions();
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Amount Spent",
        data: Object.values(data),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Transaction Categories</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
