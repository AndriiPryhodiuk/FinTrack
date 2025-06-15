export const getGoals = () => {
  return JSON.parse(localStorage.getItem("goalsData") || "[]");
};

export const saveGoals = (goalsArray) => {
  localStorage.setItem("goalsData", JSON.stringify(goalsArray));
};
