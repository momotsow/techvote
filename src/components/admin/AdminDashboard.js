// src/components/AdminDashboard.js
import React from 'react';
import { useAdmin } from '../../context/AdminContext';

function AdminDashboard() {
  const { candidates } = useAdmin();

  return (
    <div className="admin-dashboard">
      <h3>Dashboard</h3>
      <p>Total Candidates: {candidates.length}</p>
      {/* Additional dashboard info can go here */}
    </div>
  );
}

export default AdminDashboard;
