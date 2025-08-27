import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Services from './components/Services';
import Orders from './components/Orders';
import Profile from './components/Profile';
import AddFunds from './components/AddFunds';
import Statistics from './components/Statistics';
import AdminDashboard from './components/AdminDashboard';
import CustomerSupport from './components/CustomerSupport';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/services" element={user ? <Services /> : <Navigate to="/login" />} />
      <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
      <Route path="/add-funds" element={user ? <AddFunds /> : <Navigate to="/login" />} />
      <Route path="/statistics" element={user ? <Statistics /> : <Navigate to="/login" />} />
      <Route path="/support" element={user ? <CustomerSupport /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <OrderProvider>
            <Router>
              <div className="min-h-screen bg-slate-800 dark:bg-slate-800 bg-gray-50">
                <AppRoutes />
              </div>
            </Router>
          </OrderProvider>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;