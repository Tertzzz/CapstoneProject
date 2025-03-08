import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSideBar from './SuperAdminSideBar';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  return (
    <div className="super-admin-dashboard">
      <SuperAdminSideBar />
      <div className="super-admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;