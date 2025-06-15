import { useNavigate } from "react-router-dom";
import "../../styles/sidebarMenu.css";
import { apiClient } from "../../utils/api";

const SidebarMenu = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    }

    // Clear local storage
    localStorage.removeItem('userFullName');
    localStorage.removeItem('balance');

    // Navigate to root page
    navigate("/", { replace: true });
    onClose();
  };

  return (
    <div className={`sidebar-menu${open ? " open" : ""}`}>
      <button className="sidebar-close" onClick={onClose}>
        ×
      </button>
      <button
        onClick={() => {
          navigate("/app/dashboard");
          onClose();
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          navigate("/app/goals");
          onClose();
        }}
      >
        Goals
      </button>
      <button
        onClick={() => {
          navigate("/app/transactions");
          onClose();
        }}
      >
        Transactions
      </button>
      <button
        onClick={() => {
          navigate("/app/expenses");
          onClose();
        }}
      >
        Expenses
      </button>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default SidebarMenu;
