import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CategoryIcon } from '../common/CategoryIcon';

export const SidebarMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/expenses', icon: 'expenses', label: 'Expenses' },
    { path: '/transactions', icon: 'transactions', label: 'Transactions' },
    { path: '/goals', icon: 'goals', label: 'Goals' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>FinTrack</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <CategoryIcon category={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <CategoryIcon category="logout" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}; 