// src/context/AdminContext.js
import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);

  const addCandidate = (candidate) => {
    setCandidates((prevCandidates) => [...prevCandidates, candidate]);
    localStorage.setItem('candidates', JSON.stringify([...candidates, candidate]));
  };

  const value = {
    candidates,
    addCandidate,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
