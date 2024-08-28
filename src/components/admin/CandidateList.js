// src/components/CandidateList.js
import React from 'react';
import { useAdmin } from '../../context/AdminContext';

function CandidateList() {
  const { candidates } = useAdmin();

  return (
    <div className="candidate-list">
      <h3>Candidate List</h3>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            <img src={candidate.logo} alt={`${candidate.name} logo`} />
            {candidate.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CandidateList;
