import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

function CandidateForm() {
  const [candidateData, setCandidateData] = useState({
    name: '',
    logo: null, // Store the file object here
  });
  const { addCandidate } = useAdmin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected
    setCandidateData((prevData) => ({
      ...prevData,
      logo: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (candidateData.name && candidateData.logo) {
      addCandidate(candidateData);
      setCandidateData({
        name: '',
        logo: null,
      });
    } else {
      alert('Please provide a candidate name and logo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Candidate Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={candidateData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="logo">Candidate Logo:</label>
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <button type="submit">Add Candidate</button>
    </form>
  );
}

export default CandidateForm;
