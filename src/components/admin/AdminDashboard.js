import React, { useState, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import CandidateModal from './CandidateModal';
import CandidateDetailsModal from './CandidateDetailsModal'; // Import the new modal
import './AdminDashboard.css';

function AdminDashboard() {
  const { candidates, topCandidates } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Candidate modal
  const [selectedCandidate, setSelectedCandidate] = useState(null); // State for selected candidate

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setIsAddModalOpen(false);
    setSelectedCandidate(null); // Clear selected candidate when any modal is closed
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleRowClick = (candidate) => {
    setSelectedCandidate(candidate); // Set the selected candidate for details
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="top-candidates">
        {topCandidates.slice(0, 3).map((candidate, index) => (
          <div key={index} className="top-candidate">
            <img src={candidate.logo} alt={`${candidate.name} logo`} className="candidate-logo" />
            <div>
              <h2>{`${index + 1} Place Candidate`}</h2>
              <p>{candidate.name}</p>
              <p>{candidate.totalVotes} Votes</p>
            </div>
          </div>
        ))}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for candidate"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={openAddModal}>Add Candidate</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Gauteng</th>
            <th>Limpopo</th>
            <th>KZN</th>
            <th>E. Cape</th>
            <th>N. Cape</th>
            <th>North West</th>
            <th>MP</th>
            <th>Free State</th>
            <th>W. Cape</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={index} onClick={() => handleRowClick(candidate)}>
              <td>{candidate.name}</td>
              <td>{candidate.votes.gauteng}</td>
              <td>{candidate.votes.limpopo}</td>
              <td>{candidate.votes.kzn}</td>
              <td>{candidate.votes.easternCape}</td>
              <td>{candidate.votes.northernCape}</td>
              <td>{candidate.votes.northWest}</td>
              <td>{candidate.votes.mpumalanga}</td>
              <td>{candidate.votes.freeState}</td>
              <td>{candidate.votes.westernCape}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Candidate Modal */}
      {isAddModalOpen && (
        <CandidateModal onClose={closeModal}>
          {/* Your "Add Candidate" form or content here */}
          <h2>Add New Candidate</h2>
          {/* Form fields go here */}
        </CandidateModal>
      )}

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <CandidateDetailsModal candidate={selectedCandidate} onClose={closeModal} />
      )}
    </div>
  );
}

export default AdminDashboard;
