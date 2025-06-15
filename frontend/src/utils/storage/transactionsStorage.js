export function loadTransactions() {
  const raw = localStorage.getItem("transactions");
  return raw ? JSON.parse(raw) : [];
}

export function saveTransactions(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
