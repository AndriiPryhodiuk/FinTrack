import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

// Wrapper component that redirects authenticated users to dashboard
export const RedirectIfAuthenticated = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [navigate]);

  // If user is authenticated, don't render the component (redirect is in progress)
  if (isAuthenticated()) {
    return null;
  }

  return children;
}; 