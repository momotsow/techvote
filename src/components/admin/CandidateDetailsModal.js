// CandidateDetailsModal.jsx
import React from 'react';
import './CandidateDetailsModal.css';

function CandidateDetailsModal({ candidate, onClose }) {
  if (!candidate) return null; // Do not render if no candidate is selected

  // Helper function to display city votes
  const renderRegionalVotes = () => {
    const regionalVotes = candidate.votes.regional;
    if (!regionalVotes || Object.keys(regionalVotes).length === 0) {
      return <p>No regional votes available.</p>;
    }
    
    return (
      <ul>
        {Object.entries(regionalVotes).map(([city, votes]) => (
          <li key={city}>
            {city}: {votes} votes
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        <h2>{candidate.name}</h2>

        {/* National and Provincial Votes */}
        <p><strong>National Votes:</strong> {candidate.totalVotes}</p>
        <p><strong>Provincial Votes:</strong></p>
        <ul>
          <li>Gauteng: {candidate.votes.gauteng}</li>
          <li>Limpopo: {candidate.votes.limpopo}</li>
          <li>KZN: {candidate.votes.kzn}</li>
          <li>Eastern Cape: {candidate.votes.easternCape}</li>
          <li>Northern Cape: {candidate.votes.northernCape}</li>
          <li>North West: {candidate.votes.northWest}</li>
          <li>Mpumalanga: {candidate.votes.mpumalanga}</li>
          <li>Free State: {candidate.votes.freeState}</li>
          <li>Western Cape: {candidate.votes.westernCape}</li>
        </ul>

        {/* Regional Votes */}
        <p><strong>Regional Votes by City:</strong></p>
        {renderRegionalVotes()}
      </div>
    </div>
  );
}

export default CandidateDetailsModal;
