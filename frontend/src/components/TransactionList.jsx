import "../styles/transactions.css";

const TransactionList = ({ transactions }) => {
  return (
    <div className="transaction-list">
      {transactions.length === 0 ? (
        <div className="no-transactions">No transactions available</div>
      ) : (
        transactions.map((transaction) => (
          <div className="transaction-item" key={transaction.id}>
            <div className="transaction-date">
              {new Date(transaction.date).toLocaleDateString()}
            </div>
            <div className="transaction-description">
              {transaction.description}
            </div>
            <div className="transaction-category">{transaction.category}</div>
            <div className="transaction-amount">
              ${transaction.amount.toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
