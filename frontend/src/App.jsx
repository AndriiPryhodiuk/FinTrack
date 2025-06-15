import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/ExpensesPage';
import TransactionsPage from './pages/TransactionsPage';
import GoalsPage from './pages/GoalsPage';
import GoalDetailsPage from './pages/GoalDetailsPage';
import CategoryTransactionsPage from './pages/CategoryTransactionsPage';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import Error from './pages/Error';
import IntroStart from './pages/IntroStart';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/intro" element={<IntroStart />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/goals/:id" element={<GoalDetailsPage />} />
            <Route path="/category/:category" element={<CategoryTransactionsPage />} />
          </Route>
        </Route>

        {/* Error Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
