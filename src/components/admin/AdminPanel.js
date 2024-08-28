// src/components/AdminPanel.js
import React from 'react';
import AdminDashboard from './AdminDashboard';
import CandidateManagement from './CandidateManagement';

function AdminPanel() {
  return (
    <div className="admin-panel container">
      <h2>Admin Panel</h2>
      <AdminDashboard />
      <CandidateManagement />
    </div>
  );
}

export default AdminPanel;
