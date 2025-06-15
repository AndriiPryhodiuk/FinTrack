export const getUserFullName = () => {
  return localStorage.getItem("userFullName") || "";
};

export const saveUserFullName = (name) => {
  localStorage.setItem("userFullName", name);
};

export const getUserBalance = () => {
  return parseFloat(localStorage.getItem("balance")) || 0;
};

export const saveUserBalance = (balance) => {
  localStorage.setItem("balance", balance);
};

export const findUser = () => {
  return { fullName: "Andrii" };
};

export const saveUser = (user) => {};

export const userExists = (user) => {};
