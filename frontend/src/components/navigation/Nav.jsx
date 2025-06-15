import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const Nav = () => {
  const { user } = useAuth();

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <h2>FinTrack</h2>
      </div>
      <div className="nav-right">
        <div className="user-info">
          <span className="user-name">{user?.name || 'User'}</span>
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </nav>
  );
}; 