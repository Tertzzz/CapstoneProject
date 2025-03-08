import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import SuperAdminDashboard from './superadmin/SuperAdminDashboard';
import Applications from './superadmin/Applications';
import MainPage from './mainpage/MainPage';
import Userui from './user/Userui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAuthenticated = user && user.timestamp && 
    (new Date().getTime() - user.timestamp < 24 * 60 * 60 * 1000); // 24 hours

  if (!isAuthenticated) {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("UserId");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case "superadmin":
        return <Navigate to="/superadmin/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/userui" replace />;
    }
  }

  return children;
};

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/superadmin-login" element={<Login />} />
          <Route path="/admin-login" element={<Login />} />

          {/* User Routes */}
          <Route 
            path="/userui" 
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Userui />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <div>Admin Dashboard</div>
              </ProtectedRoute>
            } 
          />

          {/* SuperAdmin Routes */}
          <Route 
            path="/superadmin" 
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Navigate to="/superadmin/dashboard" replace />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/superadmin/*" 
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<div>Dashboard Overview</div>} />
            <Route path="applications" element={<Applications />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
