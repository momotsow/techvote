// src/context/AdminContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [topCandidates, setTopCandidates] = useState([]);

  useEffect(() => {
    // Load candidates from local storage when AdminProvider mounts
    const storedCandidates = JSON.parse(localStorage.getItem('candidates')) || [];
    setCandidates(storedCandidates);
  }, []);

  useEffect(() => {
    // Save candidates to local storage whenever they change
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const addCandidate = (candidate) => {
    const newCandidate = {
      ...candidate,
      votes: {
        gauteng: 0,
        limpopo: 0,
        kzn: 0,
        easternCape: 0,
        northernCape: 0,
        northWest: 0,
        mpumalanga: 0,
        freeState: 0,
        westernCape: 0,
      },
      totalVotes: 0,
    };

    const updatedCandidates = [...candidates, newCandidate];
    setCandidates(updatedCandidates);
    updateTopCandidates(updatedCandidates);
  };

  const updateTopCandidates = (updatedCandidates) => {
    const sortedCandidates = [...updatedCandidates].sort(
      (a, b) => b.totalVotes - a.totalVotes
    );
    setTopCandidates(sortedCandidates);
  };

  const recordVotes = (votes) => {
    const updatedCandidates = candidates.map((candidate) => {
      let newTotalVotes = candidate.totalVotes;
      const newVotes = { ...candidate.votes };

      Object.entries(votes).forEach(([category, votedName]) => {
        if (candidate.name === votedName) {
          newVotes[category] = (newVotes[category] || 0) + 1;
          newTotalVotes += 1;
        }
      });

      return { ...candidate, votes: newVotes, totalVotes: newTotalVotes };
    });

    setCandidates(updatedCandidates);
    updateTopCandidates(updatedCandidates);
  };

  return (
    <AdminContext.Provider value={{ candidates, topCandidates, addCandidate, recordVotes }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use AdminContext
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
