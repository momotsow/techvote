// src/components/CandidateManagement.js
import React from 'react';
import CandidateForm from './CandidatesForm';
import CandidateList from './CandidateList';

function CandidateManagement() {
  return (
    <div className="candidate-management">
      <h3>Candidate Management</h3>
      <CandidateForm />
      <CandidateList />
    </div>
  );
}

export default CandidateManagement;
