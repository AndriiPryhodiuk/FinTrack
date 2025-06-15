export const getBudget = () => {
  const budget = localStorage.getItem("budget");

  if (!budget) {
    return null;
  }

  return JSON.parse(budget);
};

export const saveBudget = (budget) => {
  localStorage.setItem("budget", JSON.stringify(budget));
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: `${(getBudget().length ?? 0) * 34} 65% 50%`,
  };
  saveBudget(newItem);

  return newItem;
};

export const deleteBudget = () => {
  saveBudget(null);
};
