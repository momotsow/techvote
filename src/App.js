// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import VotingPage from './components/VotingPage';
import ThankYou from './components/ThankYou';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import AdminPanel from './components/admin/AdminPanel';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* Wrap the admin routes with AdminProvider */}
          <Route
            path="/admin"
            element={
              <AdminProvider>
                <AdminPanel />
              </AdminProvider>
            }
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
