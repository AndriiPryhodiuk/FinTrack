// Authentication utilities
export const isAuthenticated = () => {
  // Check if user is logged in by looking for stored user data
  // Use localStorage.getItem directly since userFullName is stored as a plain string, not JSON
  const userFullName = localStorage.getItem('userFullName');
  return !!userFullName;
};

export const getAuthenticatedUser = () => {
  // Return the plain string directly from localStorage
  return localStorage.getItem('userFullName');
};
