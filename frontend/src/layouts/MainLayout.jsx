import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarMenu } from '../components/navigation/SidebarMenu';
import { Nav } from '../components/navigation/Nav';
import { useAuth } from '../context/AuthContext';

export const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <SidebarMenu />
      <div className="main-content">
        <Nav />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}; 