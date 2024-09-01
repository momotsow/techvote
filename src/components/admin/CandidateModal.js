import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import './CandidateModal.css';

const CandidateModal = ({ onClose }) => {
  const [candidateName, setCandidateName] = useState('');
  const [candidateLogo, setCandidateLogo] = useState(null);
  const [placement, setPlacement] = useState([]);
  const { addCandidate } = useAdmin();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCandidateLogo(reader.result); // Convert to base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCandidate = () => {
    if (!candidateName || !candidateLogo) {
      alert('Please fill in all fields.');
      return;
    }

    const newCandidate = {
      name: candidateName,
      logo: candidateLogo, // Use base64 URL for the logo
      placement,
    };

    addCandidate(newCandidate);
    onClose();
  };

  const handleCheckboxChange = (value) => {
    setPlacement((prevPlacement) =>
      prevPlacement.includes(value)
        ? prevPlacement.filter((item) => item !== value)
        : [...prevPlacement, value]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Candidate</h2>
        <div className="form-group">
          <label htmlFor="candidateName">Candidate Name</label>
          <input
            type="text"
            id="candidateName"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Enter Candidate Name"
            className="addCandidate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="candidateLogo">Candidate Logo</label>
          <input type="file" id="candidateLogo" onChange={handleLogoChange} className="addCandidate"/>
        </div>
        <div className="form-group">
          <label>Placement</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="National"
                onChange={(e) => handleCheckboxChange(e.target.value)}
              />
              National
            </label>
            <label>
              <input
                type="checkbox"
                value="Provincial"
                onChange={(e) => handleCheckboxChange(e.target.value)}
              />
              Provincial
            </label>
            <label>
              <input
                type="checkbox"
                value="Regional"
                onChange={(e) => handleCheckboxChange(e.target.value)}
              />
              Regional
            </label>
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={handleAddCandidate}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
